import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import * as Sentry from '@sentry/node';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import csurf from 'csurf';
import { upload, processAndUploadImage } from './utils/uploader';

// Note: xss-clean doesn't have types, so we use require but at the top
const xss = require('xss-clean');

dotenv.config();

// Sentry Initialization
Sentry.init({
    dsn: process.env.SENTRY_BACKEND_DSN,
    environment: process.env.NODE_ENV || 'development',
    tracesSampleRate: 1.0,
});

/**
 * Winston Logger Configuration
 * Captures all application events, errors, and admin actions.
 * Outputs to both console (colorized) and rotating log files.
 */
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
        new DailyRotateFile({
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ],
});

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
}));
app.use(xss());
app.use(hpp());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000, // Increased for production stability with many assets
    message: 'Too many requests, please try again later'
});
app.use('/api/', limiter);

// CSRF Protection
const csrfProtection = csurf({ cookie: true });

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Load Data
const dataPath = path.join(__dirname, '..', 'data.json');
let siteData: any = {};
try {
    siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
} catch (err) {
    logger.error('CRITICAL: Failed to load data.json', err);
}

// Routes
app.get('/api/csrf-token', csrfProtection, (req: Request, res: Response) => {
    res.json({ csrfToken: req.csrfToken() });
});

app.get('/api/company', (req, res) => res.json(siteData.company || {}));
app.get('/api/products', (req, res) => res.json(siteData.products || []));
app.get('/api/clientele', (req, res) => res.json(siteData.clientele || []));
app.get('/api/timeline', (req, res) => res.json(siteData.timeline || []));
app.get('/api/process-steps', (req, res) => res.json(siteData.processSteps || []));
app.get('/api/benefits-page', (req, res) => res.json(siteData.benefitsPage || {}));
app.get('/api/certifications-page', (req, res) => res.json(siteData.certificationsPage || {}));
app.get('/api/events', (req, res) => res.json(siteData.events || []));

/**
 * Admin Authentication Middleware
 * Checks the 'x-admin-key' header against the server-side environment variable.
 * Logs unauthorized attempts for security auditing.
 */
const adminAuth = (req: Request, res: Response, next: NextFunction) => {
    const adminKey = req.headers['x-admin-key'];
    if (adminKey === process.env.ADMIN_SECRET_KEY) {
        next();
    } else {
        logger.warn(`Unauthorized admin access attempt from IP: ${req.ip}`);
        res.status(403).json({ error: 'Unauthorized: Admin access required' });
    }
};

// Protected Event Routes
app.post('/api/events', adminAuth, (req: Request, res: Response) => {
    try {
        const { title, date, location, image, description } = req.body;
        logger.info(`[ADMIN] Adding story: ${title}`);

        if (!title || !date || !location || !image || !description) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newEvent = { id: Date.now(), title, date, location, image, description };
        if (!siteData.events) siteData.events = [];
        siteData.events.unshift(newEvent);

        fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 4), 'utf8');
        logger.info(`[ADMIN] Perspective added: ${newEvent.id}`);
        res.status(201).json(newEvent);
    } catch (err) {
        logger.error('Failed to add event', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/events/reorder', adminAuth, (req: Request, res: Response) => {
    try {
        const { events } = req.body;
        if (!Array.isArray(events)) return res.status(400).json({ error: 'Invalid data' });

        siteData.events = events;
        fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 4), 'utf8');
        logger.info(`[ADMIN] Sequence reordered: ${events.length} items`);
        res.status(200).json({ message: 'Order updated' });
    } catch (err) {
        logger.error('Failed to reorder events', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/events/:id', adminAuth, (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string);
        const { title, date, location, image, description } = req.body;
        const index = siteData.events.findIndex((e: any) => e.id === id);
        if (index === -1) return res.status(404).json({ error: 'Not found' });

        siteData.events[index] = { ...siteData.events[index], title, date, location, image, description };
        fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 4), 'utf8');
        res.status(200).json(siteData.events[index]);
    } catch (err) {
        logger.error('Failed to update event', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/events/:id', adminAuth, (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string);
        siteData.events = siteData.events.filter((e: any) => e.id !== id);
        fs.writeFileSync(dataPath, JSON.stringify(siteData, null, 4), 'utf8');
        logger.info(`[ADMIN] Event deleted: ${id}`);
        res.status(200).json({ message: 'Deleted' });
    } catch (err) {
        logger.error('Failed to delete event', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/v1/upload', adminAuth, upload.single('file'), async (req: Request, res: Response) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file' });
        const result = await processAndUploadImage(req.file) as any;
        logger.info(`[ADMIN] Asset uploaded: ${result.url}`);
        res.status(200).json(result);
    } catch (err: any) {
        logger.error('Upload Error', err);
        res.status(500).json({ error: err.message || 'Upload failed' });
    }
});

import nodemailer from 'nodemailer';

// Nodemailer Transporter Configuration
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

app.post('/api/contact', csrfProtection, async (req: Request, res: Response) => {
    const { name, email, phone, subject, message } = req.body;
    try {
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Required fields (name, email, message) are missing' });
        }

        logger.info(`[CONTACT] Processing submission from: ${email}`);

        const mailOptions = {
            from: `"${name}" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_EMAIL || 'info@biovitam.co.ke',
            subject: `Contact Form: ${subject || 'New Inquiry'}`,
            replyTo: email,
            text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Subject: ${subject || 'N/A'}

Message:
${message}
            `,
            html: `
                <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                    <h2 style="color: #00813D;">New Contact Inquiry</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                    <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        logger.info(`[CONTACT] Email successfully dispatched for: ${email}`);
        res.status(200).json({ message: 'Inquiry received and dispatched successfully' });
    } catch (err) {
        logger.error('Contact endpoint failed to dispatch email', err);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});

// Final Error Handling
Sentry.setupExpressErrorHandler(app);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error('Unhandled Exception', {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method
    });
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    logger.info(`🚀 API Gateway active on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
});

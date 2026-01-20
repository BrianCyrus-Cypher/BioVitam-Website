const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Load Data
const dataPath = path.join(__dirname, 'data.json');
let siteData = {};
try {
    siteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
} catch (err) {
    console.error('Error loading data.json:', err);
}

// Security Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*'
}));
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// Routes
app.get('/', (req, res) => {
    res.send('BioVitam API is running');
});

// Dynamic Data Routes
app.get('/api/company', (req, res) => res.json(siteData.company || {}));
app.get('/api/products', (req, res) => res.json(siteData.products || []));
app.get('/api/clientele', (req, res) => res.json(siteData.clientele || []));
app.get('/api/timeline', (req, res) => res.json(siteData.timeline || []));
app.get('/api/process-steps', (req, res) => res.json(siteData.processSteps || []));
app.get('/api/benefits-page', (req, res) => res.json(siteData.benefitsPage || {}));
app.get('/api/certifications-page', (req, res) => res.json(siteData.certificationsPage || {}));

// Contact Route
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    try {
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Please provide name, email, and message.' });
        }

        // Mock email sending
        console.log('Received Contact Form Submission:', { name, email, phone, subject, message });
        res.status(200).json({ message: 'Message sent successfully!' });

    } catch (error) {
        console.error('Contact API Error:', error);
        res.status(500).json({ error: 'Server error processing your request.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

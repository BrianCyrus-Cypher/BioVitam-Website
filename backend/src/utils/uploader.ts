import multer from 'multer';
import sharp from 'sharp';
import { v2 as cloudinary } from 'cloudinary';
import { Request } from 'express';
import path from 'path';
import fs from 'fs';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer (Memory Storage for Sharp processing)
const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req: Request, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp|gif|pdf/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images (jpg, png, webp, gif) and PDFs are allowed'));
    },
});

export const processAndUploadImage = async (file: Express.Multer.File) => {
    // If it's a PDF, just upload to Cloudinary directly
    if (file.mimetype === 'application/pdf') {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'raw', folder: 'biovitam/docs' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve({ url: result?.secure_url });
                }
            );
            uploadStream.end(file.buffer);
        });
    }

    // Optimization for images using Sharp
    const optimizedBuffer = await sharp(file.buffer)
        .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();

    const thumbnailBuffer = await sharp(file.buffer)
        .resize(200, 200, { fit: 'cover' })
        .webp({ quality: 70 })
        .toBuffer();

    // Upload Optimized Image
    const uploadToCloudinary = (buffer: Buffer, folder: string) => {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: `biovitam/${folder}`, format: 'webp' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result?.secure_url);
                }
            );
            uploadStream.end(buffer);
        });
    };

    const [mainUrl, thumbUrl] = await Promise.all([
        uploadToCloudinary(optimizedBuffer, 'events'),
        uploadToCloudinary(thumbnailBuffer, 'thumbnails'),
    ]);

    return {
        url: mainUrl,
        thumbnailUrl: thumbUrl,
        format: 'webp',
    };
};

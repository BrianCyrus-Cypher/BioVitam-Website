# BioVitam Website Project

## Overview
BioVitam is a high-performance, data-driven platform for Bio-Organic fertilizers, featuring a modern frontend built with Vite/React and a robust Node.js/Express backend.

## Tech Stack
- **Frontend**: Vite, React, Framer Motion, Tailwind CSS, Lucide Icons.
- **Backend**: Node.js, Express, Nodemailer.
- **Interactivity**: Dynamic data integration, interactive manufacturing process guide, WhatsApp/Email dual-channel communication.

## Multi-Device Testing (Before Deployment)

To try the website on another device (e.g., your phone) within the same network:

### 1. Find your Local IP Address
On Windows, run `ipconfig` in the terminal and look for `IPv4 Address` (e.g., `192.168.1.10`).

### 2. Start the Frontend with Host Exposure
Run the folgende command in the `frontend` directory:
```bash
npm run dev -- --host
```

### 3. Access from Another Device
Open the browser on your phone/tablet and enter your PC's IP and port:
`http://192.168.1.10:5173`

### 4. Backend Configuration
Ensure the `VITE_API_BASE_URL` in your frontend `.env.local` points to your PC's IP if you want the forms to work across devices:
`VITE_API_BASE_URL=http://192.168.1.10:5000/api`

## Deployment & GitHub
1. Create a new repository on [GitHub](https://github.com/new).
2. Follow the instructions in the project root to push:
```bash
git init
git add .
git commit -m "Initialize BioVitam Website"
git remote add origin https://github.com/YOUR_USERNAME/BioVitam-Website.git
git push -u origin main
```

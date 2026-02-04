# BioVitam Website - Technical Documentation

## Developer Information
**Lead Developer**: Brian Mwangi Ngatia

## Project Overview
The BioVitam website is a modern, high-performance single-page application (SPA) designed to showcase organic biofertilizer products. It features a cinematic user experience with 3D-like interactions, smooth scrolling, and dynamic content management.

## Architecture

### Frontend
- **Framework**: React 18 with TypeScript and Vite.
- **State Management**: React Context API (ThemeContext) and local state.
- **Routing**: React Router v6 with `ScrollToTop` handling.
- **Styling**: Tailwind CSS with custom configuration for "Biovitam" brand colors and dark mode support.
- **Animations**: Framer Motion for page transitions, scroll animations, and modal effects.
- **Data Source**: Fetches data from the backend API, falling back to local seed data if the backend is unreachable.

### Backend
- **Runtime**: Node.js with Express.
- **Language**: TypeScript.
- **Data Storage**: `data.json` based persistent JSON storage (NoSQL-lite approach).
- **Image Handling**: Cloudinary integration for managing dynamic assets (events, profiles).
- **Security**:
  - `helmet` for HTTP headers.
  - `cors` for cross-origin resource sharing.
  - `csurf` for CSRF protection on state-mutating endpoints.
  - `express-rate-limit` to prevent abuse.
- **Logging**: Winston logger for production-grade logging.

## Key Features & implementation Details

### 1. Yield Growth Estimator
A dynamic calculator located on the Home page.
- **Logic**: Uses a specialized algorithm to project ROI based on farm size, crop type, and crop phase.
- **Data**: Projections are derived from agronomic baselines defined in `data.json`.

### 2. Cinematic Event Gallery
- **Component**: `Events.tsx`
- **Technique**: Uses standard CSS transforms and Framer Motion to create a "Ken Burns" effect on event images.
- **Optimization**: Images are lazy-loaded and optimized for webp where possible.

### 3. Admin Command Center
- **Route**: `/admin` (Protected)
- **Auth**: Simple secret-key based session authentication.
- **Capabilities**:
    - Upload new event/story images via Cloudinary.
    - Reorder stories.
    - Update text content for events.

### 4. Performance Optimizations
- **Lazy Loading**: All route components are lazy-loaded using `React.lazy()` and `Suspense` to minimize initial bundle size.
- **Mobile Optimization**:
    - Root font size scaling (`13px` on mobile) to ensure a "stress-free" layout.
    - Touch-optimized tap targets (~44px min).
    - Reduced layout shifts (CLS) by using fixed aspect ratios for images.

## Project Structure

```
BioVitam-Website/
├── backend/
│   ├── src/
│   │   ├── controllers/   # Business logic
│   │   ├── routes/        # API endpoints
│   │   ├── types/         # TS interfaces
│   │   └── index.ts       # Entry point
│   ├── data.json          # Database
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── assets/        # Static images/fonts
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route views
│   │   ├── utils/         # Helpers (api.ts, seo.ts)
│   │   └── index.css      # Global styles & Tailwind
│   └── ...
└── ...
```

## Setup & Deployment
Refer to `README.md` for installation and running instructions.

## Maintenance
- **Data Updates**: Modify `backend/data.json` to update product details, company info, or static stories.
- **Styles**: Edit `frontend/src/index.css` for global theme variable changes.

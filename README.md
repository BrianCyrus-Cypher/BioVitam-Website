# BioVitam - Organic Agriculture Solutions

## Description
BioVitam is a premium, data-driven web platform designed for Bio-Organic fertilizers. It bridges the gap between sustainable farming and high-yield commercial agriculture through scientific innovation and digital accessibility.

## Features
- **Dynamic Product Catalog**: Detailed bio-fortified organic fertilizer data served from a central API.
- **Interactive Manufacturing Journey**: A technical deep-dive into the bio-fermentation process with step-by-step visualizations.
- **Modern Performance**: Optimized asset loading using a custom `OptimizedImage` component, lazy loading, and code splitting.
- **Dual-Channel Communication**: Seamless contact via integrated email forms and WhatsApp redirects.
- **Advanced Branding**: Premium aesthetic with glassmorphism, responsive typography, and spring-based animations.

## Tech Stack
- **Frontend**: Vite, React 18, TypeScript, Framer Motion, Tailwind CSS, Lucide Icons.
- **Backend**: Node.js, Express, Nodemailer, CORS, Helmet.
- **Quality**: ESLint, Prettier, Husky, Lint-Staged.
- **Monitoring**: Web Vitals performance tracking.

## Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone repository
git clone https://github.com/BrianCyrus-Cypher/BioVitam-Website.git

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables
Create `.env.local` files based on `.env.example` in both `frontend` and `backend` directories.

### Running Locally
```bash
# Start both servers (root directory script)
./start-dev.sh

# Or separately:
# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm run dev
```

## Documentation
- [API Documentation](./API.md)
- [Standards Implementation](./c:/Users/Cyphrian/.gemini/antigravity/brain/83183e5d-a276-444e-899c-6d5fd4a106a2/standards_implementation_plan.md)

## License
MIT

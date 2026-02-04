# BioVitam Website

## Description
BioVitam is a high-performance, cinematic web platform designed for a leading agricultural technology company. The site features an interactive 3D event gallery, a dynamic yield estimator, and a robust administrative suite for story management.

## Value Proposition
BioVitam bridges the gap between complex agronomic science and accessible digital engagement. By combining high-fidelity visuals with data-driven yield estimations, the platform:
- **Educates** farmers on the ROI of organic inputs.
- **Showcases** real-world success stories through immersive galleries.
- **Empowers** decision-making with transparent product data and usage protocols.

## Developer & Credits
**Lead Developer:** Brian Mwangi Ngatia
*Engineered for maximum performance, accessibility, and agronomic impact.*

## Features
- **Cinematic Event Gallery**: 38+ field stories with Ken Burns zoom effects and 3D parallax transitions.
- **Auto-Play Engine**: A continuous "playing" experience that cycles through global agricultural impact stories.
- **Admin Command Center**: Secure suite for real-time content management, asset uploads (via Cloudinary), and story reordering.
- **Yield Growth Estimator**: Dynamic calculation engine for agricultural ROI and output projections.
- **Performance Optimized**: Lazy-loaded assets, optimized webp delivery, sub-second transitions, and mobile-first responsive design.

## Tech Stack
- **Backend**: Node.js, Express, TypeScript, Winston (Logging), Sentry (Monitoring), JSON-based persistent storage.
- **Frontend**: React 18, Vite, TypeScript, Framer Motion (Animations), Tailwind CSS, Axios.
- **Cloud Assets**: Cloudinary for high-performance image optimization and delivery.

## Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/BrianCyrus-Cypher/BioVitam-Website.git

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
ADMIN_SECRET_KEY=your_secure_key
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### Running Locally
```bash
# Start Backend
cd backend
npm start

# Start Frontend
cd ../frontend
npm run dev
```

## Documentation
- [API Documentation](./API.md): Detailed endpoint information.
- [Technical Documentation](./TECHNICAL_DOCS.md): Architecture, tech stack, and deep-dive details.

## Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md) for local development guidelines.

## License
MIT

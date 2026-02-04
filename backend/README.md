# BioVitam Backend

Node.js/Express server providing RESTful endpoints for the BioVitam platform.

## Features
- **Dynamic Data Support**: Serves content from `data.json`.
- **Security**: Hardened with `helmet` and `express-rate-limit`.
- **Email Integration**: Integrated with `nodemailer` for contact form processing.

## Getting Started

### Prerequisites
- Node.js 18+

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env.local` or use the provided `.env.development`, `.env.staging`, `.env.production` files.

- `PORT`: Server port (default 5000).
- `CORS_ORIGIN`: Allowed origin for frontend requests.
- `LOG_LEVEL`: Logging verbosity (`debug`, `info`, `warn`, `error`).

### Run the Server
```bash
# Development
npm run dev

# Production
npm start
```

## Security
- All routes are protected by rate limiting.
- Security headers are enforced via Helmet.
- Input validation is handled at the API layer.

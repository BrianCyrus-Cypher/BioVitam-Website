# Changelog

All notable changes to the BioVitam platform will be documented in this file.

## [1.2.0] - 2026-01-28
### Added
- **Cinematic Auto-Play**: Integrated a transition engine for the Events gallery that cycles stories every 8 seconds.
- **Universal Asset Integration**: Embedded all 20+ images from the `attachment` folder with unique narratives.
- **Production Hardening**: Switched backend logging to Winston/DailyRotate and added security middleware (Helmet, HPP, XSS-Clean).
- **Health Monitoring**: New `/health` endpoint for site reliability tracking.

### Changed
- **Admin Session Persistence**: Admin keys are now stored in `localStorage` for improved UX during management sessions.
- **Backend Architecture**: Converted primary server logic to TypeScript for improved reliability.
- **Data Synchronization**: Unified `INITIAL_EVENTS` and `data.json` to act as a single source of truth.

### Fixed
- **Image Persistence**: Resolved issues where uploaded images or reordered sequences were lost on page refresh.
- **TypeScript Build Checks**: Fixed casting and unused variable errors blocking production builds.

## [1.1.0] - 2026-01-20
### Added
- **Interactive Yield Estimator**: Real-time calculator for agricultural output projections.
- **3D Gallery Transitions**: Framer Motion-powered parallax and Ken Burns effects.
- **Admin Management Suite**: Inline editing and drag-and-drop reordering for field stories.

## [1.0.0] - 2026-01-15
### Initial Release
- Core BioVitam website with Products, Company, and Contact modules.
- Responsive mobile-first design.
- JSON-based persistent data layer.

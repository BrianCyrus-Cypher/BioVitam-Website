# Contributing to BioVitam

We welcome contributions to help improve the BioVitam platform. Please follow these guidelines for a smooth development process.

## Local Development Workflow

1. **Fork & Clone**: Fork the repository and clone it to your local machine.
2. **Environment Setup**: 
   - Ensure Node.js 18+ is installed.
   - Configure your `.env` in the `backend/` directory with Cloudinary and Admin secrets.
3. **Install Dependencies**: Run `npm install` in both `frontend/` and `backend/` directories.
4. **Feature Branches**: Always create a descriptive branch for your changes: `git checkout -b feature/interactive-maps`.

## Coding Standards

- **TypeScript**: All new code must be type-safe. Avoid `any` where possible.
- **Components**: Use functional components with hooks.
- **Styling**: Prefer Tailwind CSS or standardized Vanilla CSS modules.
- **Documentation**: Add comments to complex business logic or unique animation sequences.

## Pull Request Process

1. **Run Builds**: Ensure both `npm run build` commands pass for frontend and backend.
2. **Commit Messages**: Use clear, descriptive commit messages (e.g., `feat: add auto-play toggle to events gallery`).
3. **Submit PR**: Provide a clear description of the change and any visual assets (screenshots/recordings) for UI updates.

## Reporting Issues
Please use the GitHub Issue tracker to report bugs or suggest new features. Include steps to reproduce for bug reports.

## License
By contributing, you agree that your contributions will be licensed under the MIT License.

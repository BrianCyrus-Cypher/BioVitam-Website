import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from "@sentry/react";
import App from './App.tsx'
import './index.css'
import { reportWebVitals } from './utils/performance'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 0.2, // Reduced from 1.0 to minimize overhead
  replaysSessionSampleRate: 0.05, // Reduced from 0.1
  replaysOnErrorSampleRate: 1.0,
  environment: import.meta.env.VITE_ENV || 'development',
});

// Initialize performance monitoring
reportWebVitals()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

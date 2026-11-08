import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Dev only: every scroll scene is measured once, top to bottom. Hot-swapping a
// single section leaves the sections below it measured against a stale layout
// (overlapping pins, timelines firing early), so reload the page instead.
if (import.meta.hot) {
  import.meta.hot.on('vite:afterUpdate', () => window.location.reload());
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

import { StrictMode, useEffect, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

const ImpactReports = lazy(() => import('./pages/ImpactReports.tsx'));

function BodyStyleManager() {
  const location = useLocation();

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (location.pathname === '/') {
      body.style.position = 'fixed';
      body.style.width = '100%';
      body.style.height = '100%';
      body.style.touchAction = 'pan-y';
      html.style.width = '100%';
      html.style.height = '100%';
      html.style.overflow = 'hidden';
    } else {
      body.style.position = '';
      body.style.width = '';
      body.style.height = '';
      body.style.touchAction = '';
      html.style.width = '';
      html.style.height = '';
      html.style.overflow = '';
    }
  }, [location.pathname]);

  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <BodyStyleManager />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#EEBDC2] border-t-transparent rounded-full animate-spin"></div></div>}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/impact-reports" element={<ImpactReports />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);

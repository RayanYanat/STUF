import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

const ImpactReports = lazy(() => import('./pages/ImpactReports.tsx'));

const Loading = () => <div className="flex items-center justify-center h-screen"><div className="text-center"><div className="animate-spin inline-block w-8 h-8 border-4 border-gray-300 border-t-pink-accent rounded-full"></div></div></div>;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/impact-reports" element={<Suspense fallback={<Loading />}><ImpactReports /></Suspense>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

import { StrictMode, useEffect, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

const ImpactReports = lazy(() => import('./pages/ImpactReports.tsx'));
const ChatWidget = lazy(() => import('./components/Chatbot/ChatWidget.tsx'));

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#EEBDC2] border-t-transparent rounded-full animate-spin"></div></div>}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/impact-reports" element={<ImpactReports />} />
        </Routes>
      </Suspense>
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);

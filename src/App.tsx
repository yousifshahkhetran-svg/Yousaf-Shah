import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ConfigProvider } from './context/ConfigContext';
import { HomePage } from './pages/HomePage';
import { GalleryPage } from './pages/GalleryPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { Settings, Eye } from 'lucide-react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function FloatingAdminButton() {
  const { pathname } = useLocation();

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {pathname !== '/admin' ? (
        <Link
          to="/admin"
          className="group flex items-center gap-2 px-3.5 py-2.5 bg-slate-900 text-white rounded-full shadow-lg hover:bg-slate-800 hover:shadow-xl transition-all duration-200 border border-slate-700/60 text-xs font-semibold focus-visible:outline-2 focus-visible:outline-slate-900"
          title="Open Admin Panel (/admin)"
        >
          <Settings className="w-4 h-4 text-slate-300 group-hover:rotate-45 transition-transform duration-300" />
          <span>Admin Panel</span>
        </Link>
      ) : (
        <Link
          to="/gallery"
          className="group flex items-center gap-2 px-3.5 py-2.5 bg-white text-slate-800 rounded-full shadow-lg hover:bg-slate-50 hover:shadow-xl transition-all duration-200 border border-slate-300 text-xs font-semibold focus-visible:outline-2 focus-visible:outline-slate-900"
          title="Preview Live Gallery"
        >
          <Eye className="w-4 h-4 text-slate-600" />
          <span>View Live Gallery</span>
        </Link>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-slate-900 selection:text-white relative">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <FloatingAdminButton />
          <Footer />
        </div>
      </BrowserRouter>
    </ConfigProvider>
  );
}

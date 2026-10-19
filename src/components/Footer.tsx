import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteConfig } from '../context/ConfigContext';

export const Footer: React.FC = () => {
  const { config: siteConfig } = useSiteConfig();
  const currentYear = 2026;

  return (
    <footer className="border-t border-slate-200 bg-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-semibold text-slate-800">{siteConfig.title}</span>
            <span className="hidden sm:inline text-slate-300" aria-hidden="true">·</span>
            <span>© {currentYear} All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-xs sm:text-sm font-medium">
            <Link to="/" className="text-slate-600 hover:text-slate-900 transition-colors">
              Home
            </Link>
            <Link to="/gallery" className="text-slate-600 hover:text-slate-900 transition-colors">
              Gallery
            </Link>
            <Link to="/privacy" className="text-slate-600 hover:text-slate-900 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="text-slate-600 hover:text-slate-900 transition-colors">
              Contact
            </Link>
            <Link to="/admin" className="text-slate-400 hover:text-slate-700 transition-colors">
              Admin
            </Link>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
          <p>
            This website provides direct navigation links. Gallery images open directly in the same tab.
          </p>
        </div>
      </div>
    </footer>
  );
};

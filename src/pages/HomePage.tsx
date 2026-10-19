import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteConfig } from '../context/ConfigContext';
import { ArrowRight, Images, Settings } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { config: siteConfig } = useSiteConfig();

  return (
    <div className="min-h-[72vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Simple Brand Title & Tagline */}
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white mx-auto flex items-center justify-center shadow-sm">
            <Images className="w-6 h-6" aria-hidden="true" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
            {siteConfig.title}
          </h1>

          {siteConfig.tagline && (
            <p className="text-base sm:text-lg text-slate-600 max-w-lg mx-auto text-balance">
              {siteConfig.tagline}
            </p>
          )}
        </div>

        {/* Primary Clear Call to Action */}
        <div className="flex flex-col items-center justify-center gap-4 pt-2">
          <Link
            to="/gallery"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 active:scale-[0.99]"
          >
            <span>{siteConfig.buttonText || 'View Gallery'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
          </Link>

          <p className="text-xs sm:text-sm text-slate-500">
            6 pictures with direct link destinations
          </p>
        </div>

        {/* Quick Admin Access */}
        <div className="pt-6 border-t border-slate-200/60 flex items-center justify-center">
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors"
          >
            <Settings className="w-3.5 h-3.5 text-slate-500" />
            <span>Open Admin Panel</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

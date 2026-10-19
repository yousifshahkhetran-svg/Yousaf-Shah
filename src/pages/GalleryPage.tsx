import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteConfig } from '../context/ConfigContext';
import { ImageCard } from '../components/ImageCard';
import { ArrowLeft, ExternalLink, Info } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { config: siteConfig } = useSiteConfig();
  const images = siteConfig.images || [];

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb / Back Link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Gallery Title & Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-200/80">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Image Gallery
            </h1>
            <p className="mt-1.5 text-sm text-slate-600">
              Click any image below to visit its direct destination link.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            <span>Showing {images.length} pictures</span>
          </div>
        </div>

        {/* Informational Guidance Notice (Clean & Unobtrusive) */}
        <div className="mb-8 p-3.5 sm:p-4 rounded-xl bg-slate-100/80 border border-slate-200/80 flex items-start gap-3 text-xs sm:text-sm text-slate-600">
          <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" />
          <p>
            Each picture navigates directly to its assigned destination webpage in this same tab. Standard HTML links are used without redirects or popups.
          </p>
        </div>

        {/* 6-Image Responsive Grid: 2 columns on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
          {images.map((img) => (
            <ImageCard key={img.id} image={img} />
          ))}
        </div>

        {/* Bottom Navigation CTA */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 text-center sm:text-left flex flex-wrap items-center gap-2">
            <span>Want to update these pictures or links?</span>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 font-semibold text-slate-800 underline underline-offset-2 hover:text-slate-950"
            >
              <span>Open Admin Panel</span>
              <ArrowLeft className="w-3 h-3 rotate-180" />
            </Link>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors shadow-2xs whitespace-nowrap"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Return to Landing Page</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

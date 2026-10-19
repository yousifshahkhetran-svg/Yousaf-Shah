import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ArrowRight, Grid3X3, ShieldCheck, Zap } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="py-8 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
            {siteConfig.title}
          </h1>
          {siteConfig.tagline && (
            <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto text-balance">
              {siteConfig.tagline}
            </p>
          )}
        </div>

        {/* Large Sample Image (NON-CLICKABLE AS REQUIRED) */}
        <div className="relative mx-auto bg-white p-2 sm:p-3 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/90 overflow-hidden">
          {/* Note: Standard div container with no link wrapping. Non-clickable. */}
          <div 
            className="w-full rounded-xl sm:rounded-2xl overflow-hidden cursor-default select-none pointer-events-none"
            aria-label="Sample preview image"
          >
            <ImageWithFallback
              src={siteConfig.sampleImage}
              alt={siteConfig.sampleImageCaption || "Sample showcase image"}
              caption={siteConfig.sampleImageCaption || "Sample Preview"}
              aspectRatioClass="aspect-[16/10] sm:aspect-[16/9]"
              className="w-full h-full object-cover"
            />
          </div>

          {siteConfig.sampleImageCaption && (
            <div className="px-3 pt-3 pb-1 flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium text-slate-700">{siteConfig.sampleImageCaption}</span>
              <span>Sample Preview</span>
            </div>
          )}
        </div>

        {/* Primary Call to Action Button */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center">
          <Link
            to="/gallery"
            className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 text-base font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 active:scale-[0.99]"
          >
            <span>{siteConfig.buttonText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
          </Link>

          <p className="mt-3 text-xs sm:text-sm text-slate-500">
            Browse our full 6-picture collection with direct access links.
          </p>
        </div>

        {/* Quiet Trust & Feature Row */}
        <div className="mt-14 pt-10 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center p-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-3 text-slate-800">
              <Grid3X3 className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Direct Navigation</h3>
            <p className="mt-1 text-xs text-slate-500 text-balance">
              Every gallery picture connects directly to its designated webpage in the same tab.
            </p>
          </div>

          <div className="flex flex-col items-center p-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-3 text-slate-800">
              <Zap className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Lightweight & Fast</h3>
            <p className="mt-1 text-xs text-slate-500 text-balance">
              Optimized for instant page loads, smooth browsing, and responsive mobile viewing.
            </p>
          </div>

          <div className="flex flex-col items-center p-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-3 text-slate-800">
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Transparent & Safe</h3>
            <p className="mt-1 text-xs text-slate-500 text-balance">
              No popups, no hidden redirects, and no forced advertisements.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

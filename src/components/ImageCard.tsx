import React from 'react';
import { GalleryImage } from '../config/siteConfig';
import { ImageWithFallback } from './ImageWithFallback';
import { ExternalLink } from 'lucide-react';

interface ImageCardProps {
  image: GalleryImage;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200">
      {/* Standard HTML anchor link opening in same browser tab */}
      <a
        href={image.destinationUrl}
        target="_self"
        rel="noopener"
        aria-label={`Open ${image.caption || `image ${image.id}`} destination`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 group"
      >
        <div className="relative overflow-hidden aspect-[4/3]">
          <ImageWithFallback
            src={image.imageUrl}
            alt={image.caption || `Gallery item ${image.id}`}
            caption={image.caption}
            aspectRatioClass="aspect-[4/3]"
            className="group-hover:scale-103 transition-transform duration-300 ease-out"
          />

          {/* Discreet hover indicator showing direct destination */}
          <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-end p-3 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-white/95 text-slate-800 rounded-md shadow-xs backdrop-blur-xs">
              <span>Open link</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
            </span>
          </div>
        </div>

        {/* Clean, unboxed caption & metadata */}
        <div className="p-3.5 sm:p-4 flex items-center justify-between gap-2 border-t border-slate-100">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-slate-900 truncate group-hover:text-slate-700 transition-colors">
              {image.caption || `Picture ${image.id}`}
            </h3>
            <p className="text-xs text-slate-500 truncate mt-0.5">
              {image.destinationUrl}
            </p>
          </div>
          <div className="shrink-0 text-slate-400 group-hover:text-slate-900 transition-colors" aria-hidden="true">
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </a>
    </div>
  );
};

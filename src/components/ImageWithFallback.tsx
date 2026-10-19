import React, { useState, useEffect } from 'react';
import { ImageOff, Camera } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  caption?: string;
  aspectRatioClass?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  caption,
  aspectRatioClass = 'aspect-[4/3]',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden bg-slate-100 ${aspectRatioClass} ${containerClassName}`}
    >
      {/* Loading Skeleton */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-slate-200/70 animate-pulse flex items-center justify-center">
          <Camera className="w-8 h-8 text-slate-400/60" aria-hidden="true" />
        </div>
      )}

      {/* Styled Fallback if URL fails to load */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-slate-100 to-slate-200 text-slate-600 select-none">
          <div className="w-12 h-12 rounded-xl bg-white/80 shadow-xs flex items-center justify-center mb-3 text-slate-500 border border-slate-200/80">
            <ImageOff className="w-6 h-6" aria-hidden="true" />
          </div>
          <span className="text-sm font-semibold text-slate-800 line-clamp-1">
            {caption || alt || 'Image Preview'}
          </span>
          <span className="text-xs text-slate-500 mt-1">
            Image link pending or unreachable
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${className}`}
        />
      )}
    </div>
  );
};

import { useState, ImgHTMLAttributes } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ImageFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackIconSize?: number;
}

export function ImageFallback({ className, src, alt, fallbackIconSize = 32, ...props }: ImageFallbackProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error || !src) {
    return (
      <div className={cn("flex items-center justify-center bg-slate-100 text-slate-400 rounded-lg", className)}>
        <ImageIcon size={fallbackIconSize} />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!loaded && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse rounded-lg" />
      )}
      <img
        src={src}
        alt={alt}
        className={cn("transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0", className)}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        {...props}
      />
    </div>
  );
}

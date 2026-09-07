import { useState, useEffect } from 'react';
import { ImageFallback } from '../ui/ImageFallback';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ProductGalleryProps {
  images: string[];
  altText: string;
}

export function ProductGallery({ images, altText }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);

  useEffect(() => {
    setMainImage(images[0]);
  }, [images]);

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square bg-white rounded-2xl p-8 flex items-center justify-center border border-slate-200 shadow-sm overflow-hidden">
        <ImageFallback 
          src={mainImage} 
          alt={altText} 
          className="w-full h-full object-contain mix-blend-multiply"
          fallbackIconSize={64}
        />
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setMainImage(img)}
              className={cn(
                "w-20 h-20 flex-shrink-0 rounded-xl bg-white p-2 border-2 transition-all overflow-hidden",
                mainImage === img ? "border-brand-500" : "border-slate-200 hover:border-brand-300"
              )}
            >
              <ImageFallback src={img} alt={`${altText} view ${idx + 1}`} className="w-full h-full object-contain mix-blend-multiply" fallbackIconSize={20} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

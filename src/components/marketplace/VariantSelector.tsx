import { Variant } from '../../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariantId: string;
  onSelect: (variant: Variant) => void;
}

export function VariantSelector({ variants, selectedVariantId, onSelect }: VariantSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {variants.map(variant => (
        <button
          key={variant.id}
          onClick={() => onSelect(variant)}
          className={cn(
            "px-4 py-2 rounded-lg border text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1",
            selectedVariantId === variant.id 
              ? "border-brand-500 bg-brand-50 text-brand-700" 
              : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
          )}
        >
          <div className="flex flex-col items-start">
            <span>{variant.storage} • {variant.color}</span>
          </div>
        </button>
      ))}
    </div>
  );
}

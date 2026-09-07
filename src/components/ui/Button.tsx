import { ButtonHTMLAttributes } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function Button({ 
  className, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false, 
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        {
          "bg-brand-600 text-white hover:bg-brand-700": variant === 'primary',
          "bg-slate-100 text-slate-900 hover:bg-slate-200": variant === 'secondary',
          "border-2 border-slate-200 text-slate-900 hover:bg-slate-50": variant === 'outline',
          "px-4 py-2 text-sm": size === 'sm',
          "px-6 py-3 text-sm": size === 'md',
          "px-8 py-4 text-base": size === 'lg',
          "w-full": fullWidth
        },
        className
      )}
      {...props}
    />
  );
}

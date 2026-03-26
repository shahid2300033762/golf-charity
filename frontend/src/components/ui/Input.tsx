import type { InputHTMLAttributes } from 'react';
import { cn } from './Button';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-on-surface/80 text-sm font-inter tracking-wide uppercase">{label}</label>}
      <input
        className={cn(
          'input-quiet',
          error && 'border-error focus:border-error bg-error-container/10',
          className
        )}
        {...props}
      />
      {error && <span className="text-error text-xs font-inter mt-1">{error}</span>}
    </div>
  );
}

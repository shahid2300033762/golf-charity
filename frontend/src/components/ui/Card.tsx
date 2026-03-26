import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from './Button';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glass?: boolean;
}

export function Card({ children, className, glass = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'card p-6 md:p-8',
        glass ? 'bg-surface-bright/40 border border-outline-variant/10 backdrop-blur-xl' : '',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

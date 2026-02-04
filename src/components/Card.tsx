import { ReactNode } from 'react';

export function Card({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <div className={`bg-surface border border-white/10 rounded-2xl p-4 transition-all hover:border-white/20 ${className}`}>
      {children}
    </div>
  );
}
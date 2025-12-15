import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

export function Card({ children, className = '', title, subtitle, ...props }: CardProps) {
  return (
    <div
      className={`bg-white dark:bg-slate-900 border border-border shadow-sm rounded-lg ${className}`}
      {...props}
    >
      {(title || subtitle) && (
        <div className="border-b border-border px-5 py-4">
          {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
          {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}




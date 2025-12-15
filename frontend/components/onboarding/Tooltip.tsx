'use client';

import { ReactNode, useState } from 'react';

type TooltipProps = {
  content: string;
  children: ReactNode;
};

export function Tooltip({ content, children }: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      {open && (
        <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max max-w-xs rounded-md bg-slate-900 text-white text-xs px-3 py-2 shadow-lg z-40">
          {content}
        </span>
      )}
    </span>
  );
}


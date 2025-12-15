import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, helperText, error, className = '', ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-slate-700" htmlFor={props.id}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        {...props}
      />
      {helperText && !error && <p className="text-xs text-slate-500">{helperText}</p>}
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
});


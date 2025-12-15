'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';

type TourStep = {
  title: string;
  description: string;
};

type TourProps = {
  steps: TourStep[];
  onClose: () => void;
  storageKey?: string;
};

export function Tour({ steps, onClose, storageKey = 'clinicsense-tour-dismissed' }: TourProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const dismiss = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, 'true');
    }
    onClose();
  };

  const next = () => {
    if (index < steps.length - 1) {
      setIndex((i) => i + 1);
    } else {
      dismiss();
    }
  };

  const back = () => {
    setIndex((i) => Math.max(0, i - 1));
  };

  const step = steps[index];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 border border-border rounded-xl shadow-2xl max-w-lg w-full mx-4 p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
              Step {index + 1} of {steps.length}
            </p>
            <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
          </div>
          <button
            onClick={dismiss}
            className="text-slate-400 hover:text-slate-600 transition"
            aria-label="Close tour"
          >
            ✕
          </button>
        </div>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{step.description}</p>
        <div className="mt-6 flex items-center justify-between">
          <Button variant="outline" onClick={back} disabled={index === 0}>
            Back
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {steps.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full ${
                    i === index ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>
            <Button onClick={next}>{index === steps.length - 1 ? 'Finish' : 'Next'}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}




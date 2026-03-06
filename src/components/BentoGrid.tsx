import React from 'react';

interface BentoBoxProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  span?: 'col-1' | 'col-2' | 'col-3' | 'row-1' | 'row-2';
}

export const BentoBox = ({ children, title, className = '', span = 'col-1' }: BentoBoxProps) => {
  const spanClasses = {
    'col-1': 'col-span-1',
    'col-2': 'col-span-2',
    'col-3': 'col-span-3',
    'row-1': 'row-span-1',
    'row-2': 'row-span-2',
  };

  return (
    <div className={`glass-panel rounded-3xl p-6 flex flex-col space-y-4 hover:border-white/20 transition-all duration-500 group ${spanClasses[span as keyof typeof spanClasses]} ${className}`}>
      {title && (
        <h3 className="text-[var(--color-amaura-text-muted)] text-sm font-semibold uppercase tracking-widest px-1">
          {title}
        </h3>
      )}
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};

export const BentoGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
      {children}
    </div>
  );
};

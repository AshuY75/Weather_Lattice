import React from 'react';
import { twMerge } from 'tailwind-merge';

// --- DATA CARD COMPONENT ---

const MetricCard = ({ title, value, unit, icon: Icon, description, className }) => {
  return (
    <div className={twMerge("glass glass-hover p-6 flex flex-col gap-3 group", className)}>
      <div className="flex items-center justify-between text-slate-400 group-hover:text-primary transition-colors duration-300">
        <span className="text-sm font-medium uppercase tracking-wider">{title}</span>
        {Icon && <Icon size={18} className="opacity-70 group-hover:opacity-100" />}
      </div>
      
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-white tracking-tight">{value}</span>
        {unit && <span className="text-sm font-medium text-slate-400">{unit}</span>}
      </div>

      {description && (
        <div className="text-xs text-slate-500 mt-auto pt-2 border-t border-white/5">
          {description}
        </div>
      )}
    </div>
  );
};

export default MetricCard;

import React from 'react';

// --- LOADING SKELETON ---

const SkeletonLoader = ({ count = 3, className = "" }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass p-6 min-h-[140px] bg-slate-800/10">
          <div className="h-4 w-1/3 bg-slate-400/20 rounded mb-4" />
          <div className="h-8 w-2/3 bg-slate-400/20 rounded mb-4" />
          <div className="h-4 w-1/2 bg-slate-400/20 rounded" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;

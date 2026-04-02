import React from 'react';
import { NavLink } from 'react-router-dom';
import { Cloud, History, Settings } from 'lucide-react';
import { useSettings } from '../SettingsContext';

// --- NAVIGATION LAYOUT ---

const Layout = ({ children }) => {
  const { unit, toggleUnit } = useSettings();

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-indigo-500/30">
      <nav className="sticky top-0 z-50 glass mb-6 px-4 py-3 mx-4 mt-4 flex items-center justify-between">
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          SkyCast Dashboard
        </h1>
        
        <div className="flex items-center gap-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${isActive ? 'bg-indigo-500/20 text-indigo-400' : 'hover:bg-white/10'}`}
          >
            <Cloud size={20} />
            <span className="hidden sm:inline">Forecast</span>
          </NavLink>
          
          <NavLink 
            to="/historical" 
            className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${isActive ? 'bg-indigo-500/20 text-indigo-400' : 'hover:bg-white/10'}`}
          >
            <History size={20} />
            <span className="hidden sm:inline">Historical</span>
          </NavLink>

          <button 
            onClick={toggleUnit}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 transition-all font-medium text-sm"
          >
            <Settings size={16} />
            <span>°{unit === 'celsius' ? 'C' : 'F'}</span>
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4 pb-20">
        {children}
      </main>
    </div>
  );
};

export default Layout;

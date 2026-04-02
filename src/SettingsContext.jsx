import React, { createContext, useContext, useState } from 'react';

// --- CONTEXT CREATION ---
const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [unit, setUnit] = useState(() => {
    return localStorage.getItem('weather_unit') || 'celsius';
  });

  const toggleUnit = () => {
    const newUnit = unit === 'celsius' ? 'fahrenheit' : 'celsius';
    setUnit(newUnit);
    localStorage.setItem('weather_unit', newUnit);
  };

  const convertTemp = (tempC) => {
    if (unit === 'celsius') return tempC;
    return (tempC * 9 / 5) + 32;
  };

  const formatTemp = (tempC) => {
    const val = convertTemp(tempC);
    return `${Math.round(val)}°${unit === 'celsius' ? 'C' : 'F'}`;
  };

  return (
    <SettingsContext.Provider value={{ unit, toggleUnit, convertTemp, formatTemp }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);

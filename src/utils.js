import { format, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

// --- DATE FORMATTING ---

export const formatToIST = (dateStr, formatStr = 'HH:mm') => {
  if (!dateStr) return 'N/A';
  const date = parseISO(dateStr);
  const istDate = toZonedTime(date, 'Asia/Kolkata');
  return format(istDate, formatStr);
};

export const formatDate = (dateStr, formatStr = 'MMM d, yyyy') => {
  if (!dateStr) return 'N/A';
  return format(parseISO(dateStr), formatStr);
};

// --- DESCRIPTOR MAPPINGS ---

export const getWeatherDescription = (code) => {
  const codes = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Foggy',
    51: 'Light drizzle',
    53: 'Drizzle',
    55: 'Heavy drizzle',
    61: 'Slight rain',
    63: 'Rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Snow',
    75: 'Heavy snow',
    80: 'Rain showers',
    81: 'Rain showers',
    82: 'Rain showers',
    95: 'Thunderstorm',
  };
  return codes[code] || 'Unknown';
};

export const getAQIDescription = (aqi) => {
  if (aqi <= 50) return { label: 'Good', border: 'border-emerald-500/20 shadow-emerald-500/10' };
  if (aqi <= 100) return { label: 'Fair', border: 'border-yellow-500/20 shadow-yellow-500/10' };
  if (aqi <= 150) return { label: 'Moderate', border: 'border-orange-500/20 shadow-orange-500/10' };
  if (aqi <= 200) return { label: 'Poor', border: 'border-red-500/20 shadow-red-500/10' };
  return { label: 'Very Poor', border: 'border-purple-500/20 shadow-purple-500/10' };
};

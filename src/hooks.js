import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchWeatherData, fetchAirQualityData, fetchHistoricalData } from './api';

// --- GEOLOCATION HOOK ---

export const useGeolocation = () => {
  const [location, setLocation] = useState(() => {
    const cached = localStorage.getItem('weather_app_location');
    return cached ? JSON.parse(cached) : null;
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!location);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported');
      setLoading(false);
      return;
    }

    const onSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      const newLoc = { latitude, longitude };
      setLocation(newLoc);
      localStorage.setItem('weather_app_location', JSON.stringify(newLoc));
      setLoading(false);
    };

    const onError = (err) => {
      setError(err.message);
      setLoading(false);
    };

    if (!location) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      setLoading(false);
    }
  }, [location]);

  return { location, error, loading, setLocation };
};

// --- DATA FETCHING HOOKS ---

export const useWeather = (location) => {
  return useQuery({
    queryKey: ['weather', location?.latitude, location?.longitude],
    queryFn: () => fetchWeatherData(location),
    enabled: !!location,
  });
};

export const useAirQuality = (location) => {
  return useQuery({
    queryKey: ['aqi', location?.latitude, location?.longitude],
    queryFn: () => fetchAirQualityData(location),
    enabled: !!location,
  });
};

export const useHistoricalWeather = (location, startDate, endDate) => {
  return useQuery({
    queryKey: ['historical', location?.latitude, location?.longitude, startDate, endDate],
    queryFn: () => fetchHistoricalData({ ...location, startDate, endDate }),
    enabled: !!location && !!startDate && !!endDate,
  });
};

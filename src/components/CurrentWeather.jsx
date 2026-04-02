import React, { useMemo } from 'react';
import { 
  Thermometer, Droplets, Wind, Sun, Sunrise, Sunset, 
  CloudRain, Activity, AlertCircle 
} from 'lucide-react';
import { useWeather, useAirQuality, useGeolocation } from '../hooks';
import { useSettings } from '../SettingsContext';
import MetricCard from './MetricCard';
import WeatherChart from './WeatherChart';
import SkeletonLoader from './SkeletonLoader';
import { formatToIST, getWeatherDescription, getAQIDescription } from '../utils';

// --- CURRENT WEATHER PAGE ---

const CurrentWeather = () => {
  const { location, error: geoError, loading: geoLoading } = useGeolocation();
  const { data: weather, isLoading: weatherLoading } = useWeather(location);
  const { data: aqi, isLoading: aqiLoading } = useAirQuality(location);
  const { unit, formatTemp } = useSettings();

  const hourlyData = useMemo(() => {
    if (!weather || !aqi) return [];
    return weather.hourly.time.map((time, i) => ({
      time: formatToIST(time, 'HH:mm'),
      temp: weather.hourly.temperature_2m[i],
      humidity: weather.hourly.relative_humidity_2m[i],
      precipitation: weather.hourly.precipitation[i],
      pm25: aqi.hourly.pm2_5[i],
    })).slice(0, 24);
  }, [weather, aqi]);

  // --- RENDER STATES ---

  if (geoLoading || weatherLoading || aqiLoading) {
    return <div className="space-y-12"><SkeletonLoader count={8} /></div>;
  }

  if (geoError && !location) {
    return (
      <div className="glass p-12 text-center max-w-2xl mx-auto mt-20 border-red-500/20">
        <AlertCircle size={48} className="mx-auto mb-6 text-red-400" />
        <h2 className="text-2xl font-bold mb-4">Location Error</h2>
        <p className="text-slate-400">Please enable geolocation for the dashboard to function correctly.</p>
      </div>
    );
  }

  const cur = weather?.current;
  const dly = weather?.daily;
  const curAQI = aqi?.current;
  const aqiInf = getAQIDescription(curAQI?.us_aqi);

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* --- DASHBOARD HEADER --- */}
      <section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-100">Live Forecast</h2>
            <p className="text-slate-400">{getWeatherDescription(cur?.weather_code)} &bull; {formatToIST(new Date().toISOString(), 'MMM d, HH:mm')}</p>
          </div>
          <div className="text-right">
            <span className="text-6xl font-black text-white">{formatTemp(cur?.temperature_2m)}</span>
          </div>
        </div>
        
        {/* --- MAIN METRICS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Low/High" value={`${Math.round(dly?.temperature_2m_min[0])}° / ${Math.round(dly?.temperature_2m_max[0])}°`} unit={unit === 'celsius' ? 'C' : 'F'} icon={Thermometer} />
          <MetricCard title="Humidity" value={cur?.relative_humidity_2m} unit="%" icon={Droplets} />
          <MetricCard title="UV Index" value={dly?.uv_index_max[0]} icon={Sun} className={dly?.uv_index_max[0] > 7 ? 'border-orange-500/20' : ''} />
          <MetricCard title="Wind" value={cur?.wind_speed_10m} unit="km/h" icon={Wind} />
          <MetricCard title="Rainfall" value={cur?.precipitation} unit="mm" icon={CloudRain} />
          <MetricCard title="AQI Level" value={curAQI?.us_aqi} description={aqiInf.label} icon={Activity} className={aqiInf.border} />
          <MetricCard title="Sunrise" value={formatToIST(dly?.sunrise[0])} icon={Sunrise} />
          <MetricCard title="Sunset" value={formatToIST(dly?.sunset[0])} icon={Sunset} />
        </div>
      </section>

      {/* --- HOURLY FLOW GRAPHS --- */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeatherChart data={hourlyData} dataKey="temp" unit={unit === 'celsius' ? '°C' : '°F'} name="Temperature" color="#818cf8" />
        <WeatherChart data={hourlyData} dataKey="humidity" unit="%" name="Humidity" color="#22d3ee" />
        <WeatherChart data={hourlyData} dataKey="precipitation" unit="mm" name="Precipitation" color="#6366f1" />
        <WeatherChart data={hourlyData} dataKey="pm25" unit="µg/m³" name="PM2.5" color="#ec4899" />
      </section>
    </div>
  );
};

export default CurrentWeather;

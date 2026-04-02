import React, { useState, useMemo } from 'react';
import { 
  Calendar, Thermometer, CloudRain, Wind, 
  Sunrise, Sunset, AlertCircle 
} from 'lucide-react';
import { subYears, subDays, format } from 'date-fns';
import { useHistoricalWeather, useGeolocation } from '../hooks';
import { useSettings } from '../SettingsContext';
import MetricCard from './MetricCard';
import WeatherChart from './WeatherChart';
import SkeletonLoader from './SkeletonLoader';
import { formatToIST, formatDate } from '../utils';

// --- HISTORICAL ANALYSIS PAGE ---

const HistoricalWeather = () => {
  const { location } = useGeolocation();
  const [start, setStart] = useState(format(subYears(new Date(), 1), 'yyyy-MM-dd'));
  const [end, setEnd] = useState(format(subDays(new Date(), 2), 'yyyy-MM-dd'));
  
  const { data: hist, isLoading, error } = useHistoricalWeather(location, start, end);
  const { unit } = useSettings();

  const chartData = useMemo(() => {
    if (!hist?.daily) return [];
    return hist.daily.time.map((time, i) => ({
      time: formatDate(time, 'MMM d'),
      mean: hist.daily.temperature_2m_mean[i],
      rain: hist.daily.precipitation_sum[i],
      wind: hist.daily.wind_speed_10m_max[i],
    }));
  }, [hist]);

  // --- RENDER LOGIC ---

  if (isLoading) return <SkeletonLoader count={4} />;
  if (error) return <div className="glass p-12 text-center border-red-500/20"><AlertCircle size={48} className="mx-auto mb-6 text-red-400" /><h2>Error Loading Data</h2></div>;

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom duration-700">
      {/* --- DATE SELECTION BAR --- */}
      <section className="glass p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-3"><Calendar className="text-indigo-400" />History</h2>
          <p className="text-slate-400 text-sm">Data range: {formatDate(start)} to {formatDate(end)}</p>
        </div>
        
        <div className="flex gap-4">
          <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm" />
          <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm" />
        </div>
      </section>

      {/* --- PERIOD TRENDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Avg Temperature" value={(hist?.daily?.temperature_2m_mean?.reduce((a, b) => a + b, 0) / hist?.daily?.temperature_2m_mean?.length).toFixed(1)} unit={unit === 'celsius' ? '°C' : '°F'} icon={Thermometer} />
        <MetricCard title="Total Rain" value={hist?.daily?.precipitation_sum?.reduce((a, b) => a + b, 0).toFixed(1)} unit="mm" icon={CloudRain} />
        <MetricCard title="Peak Wind" value={Math.max(...hist?.daily?.wind_speed_10m_max).toFixed(1)} unit="km/h" icon={Wind} />
      </div>

      <div className="space-y-6">
        <WeatherChart data={chartData} dataKey="mean" unit={unit === 'celsius' ? '°C' : '°F'} name="Temperature Trend" color="#818cf8" />
        <WeatherChart data={chartData} dataKey="rain" unit="mm" name="Rainfall History" color="#6366f1" />
      </div>

      {/* --- SUN CYCLE LOGS --- */}
      <section className="glass p-8 overflow-hidden rounded-2xl">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">Sun Cycle (IST)</h3>
        <div className="max-h-96 overflow-y-auto scrollbar-thin">
          <table className="w-full text-left">
            <thead className="text-slate-500 text-xs uppercase font-bold border-b border-white/10">
              <tr><th className="pb-4">Date</th><th className="pb-4">Sunrise</th><th className="pb-4">Sunset</th></tr>
            </thead>
            <tbody className="text-sm">
              {[...(hist?.daily?.time || [])].reverse().map((time, i, arr) => (
                <tr key={time} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                  <td className="py-4 font-medium">{formatDate(time)}</td>
                  <td className="py-4 text-orange-200">{formatToIST(hist.daily.sunrise[arr.length - 1 - i])}</td>
                  <td className="py-4 text-indigo-200">{formatToIST(hist.daily.sunset[arr.length - 1 - i])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default HistoricalWeather;

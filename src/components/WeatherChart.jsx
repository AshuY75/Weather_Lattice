import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Brush, Legend 
} from 'recharts';

// --- DATA CHART COMPONENT ---

const WeatherChart = ({ 
  data, 
  dataKey, 
  name, 
  xAxisKey = 'time', 
  color = '#818cf8', 
  unit = '',
  height = 300,
  minWidth = 600
}) => {
  return (
    <div className="glass p-4 h-full flex flex-col gap-4 overflow-hidden group">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-sm font-medium text-slate-400 group-hover:text-primary transition-colors tracking-widest">{name}</h3>
      </div>
      
      <div className="chart-container flex-grow cursor-crosshair">
        <div style={{ minWidth: minWidth, height: height }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey={xAxisKey} stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis 
                stroke="#64748b" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                width={35}
                tickFormatter={(val) => `${val}${unit}`}
              />
              <Tooltip 
                content={({ active, payload, label }) => active && payload ? (
                  <div className="glass p-3 text-xs border-white/20">
                    <p className="text-slate-400 font-medium">{label}</p>
                    <p className="text-sm font-bold" style={{ color: payload[0].color }}>
                      {payload[0].name}: {payload[0].value.toFixed(1)}{unit}
                    </p>
                  </div>
                ) : null}
              />
              <Legend iconType="circle" />
              <Area 
                type="monotone" 
                dataKey={dataKey} 
                name={name}
                stroke={color} 
                fill={`url(#gradient-${dataKey})`} 
                strokeWidth={3}
                dot={false}
              />
              <Brush height={30} stroke="rgba(129, 140, 248, 0.4)" fill="rgba(15, 23, 42, 0.5)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default WeatherChart;

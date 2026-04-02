# SkyCast Weather Dashboard

A production-grade ReactJS Weather Dashboard built with performance, clean architecture, and responsive design in mind.

## 🚀 Tech Stack

- **Core**: React 19 (Functional Components + Hooks)
- **Styling**: Tailwind CSS v4 (Mobile-first, Glassmorphism UI)
- **State Management**: React Query (TanStack Query) for data fetching and caching
- **Charts**: Recharts (Interactive with Zoom/Scroll support)
- **Icons**: Lucide React
- **Time Management**: date-fns & date-fns-tz (IST conversion)
- **API**: [Open-Meteo](https://open-meteo.com/) (Forecast, Air Quality, Historical)

## 📁 Project Structure

```text
/src
  /components     # Reusable UI (MetricCards, Charts, Layout)
  /context        # Global state (Settings/Units)
  /hooks          # Custom hooks (Geolocation, Weather API)
  /pages          # Page components (Current, Historical)
  /services       # API layer (Axios)
  /utils          # Date formatting, IST conversion, Mappings
  /constants      # API URLs and config
```

## ✨ Key Features

- **Auto-Location**: Detects user location via browser Geolocation API with persistent caching.
- **Interactive Charts**: Responsive charts for temperature, humidity, wind, and air quality with horizontal scroll and zoom.
- **IST Conversion**: Automatic conversion of sunrise/sunset and hourly data to Indian Standard Time (IST).
- **Global Unit Toggle**: Switch between Celsius and Fahrenheit across the entire dashboard.
- **Historical Data**: Analyze weather trends from the last 2 years.
- **Performance Optimized**: Lazy loading of pages, memoized chart data, and skeleton loaders for <500ms initial render perception.

## 🛠️ Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 📈 Performance Approach

- **React Query Caching**: Forecast data is cached for 15 minutes, historical data is cached indefinitely.
- **Lazy Loading**: Route-based code splitting using `React.lazy` and `Suspense`.
- **Component Memoization**: Use of `useMemo` for heavy chart data transformations.
- **Mobile-First CSS**: Minimal CSS footprint using Tailwind v4.
- **Skeleton Screens**: Immediate visual feedback during data fetching.

import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SkeletonLoader from './components/SkeletonLoader';

// --- PAGE COMPONENTS ---

const CurrentWeather = lazy(() => import('./components/CurrentWeather'));
const HistoricalWeather = lazy(() => import('./components/HistoricalWeather'));

// --- MAIN APP ROUTING ---

function App() {
  return (
    <Layout>
      <Suspense fallback={<SkeletonLoader count={4} className="mt-8" />}>
        <Routes>
          <Route path="/" element={<CurrentWeather />} />
          <Route path="/historical" element={<HistoricalWeather />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;

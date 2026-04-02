import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { SettingsProvider } from './SettingsContext'
import App from './App'
import './index.css'

// --- CLIENT SETUP ---
const queryClient = new QueryClient();

// --- ROOT RENDER ---
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)

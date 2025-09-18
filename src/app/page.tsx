'use client';

import { useWeatherStore } from '@/store/weather-store';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import ForecastList from '@/components/ForecastList';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { motion } from 'framer-motion';

export default function Home() {
  const { currentWeather, forecast, loading, error, clearWeatherData } = useWeatherStore();

  const handleRetry = () => {
    clearWeatherData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-8"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          🌤️ WeatherWise
        </h1>
        <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto px-4">
          Get instant weather updates and forecasts for any city worldwide
        </p>
      </motion.header>

      {/* Search Bar */}
      <div className="container mx-auto px-4 mb-8">
        <SearchBar />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        {loading && (
          <LoadingSpinner message="Fetching weather data..." />
        )}

        {error && (
          <ErrorMessage 
            error={error} 
            onRetry={handleRetry}
            className="max-w-md mx-auto"
          />
        )}

        {!loading && !error && currentWeather && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Current Weather */}
            <WeatherCard 
              weather={currentWeather}
              className="max-w-4xl mx-auto"
            />

            {/* Forecast */}
            {forecast.length > 0 && (
              <ForecastList 
                forecast={forecast}
                className="max-w-4xl mx-auto"
              />
            )}
          </motion.div>
        )}

        {/* Welcome Message */}
        {!loading && !error && !currentWeather && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">
                Welcome to WeatherWise! 🌤️
              </h2>
              <p className="text-blue-100 text-lg mb-6">
                Search for any city to get current weather conditions and a 5-day forecast.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-100">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl mb-2">🌡️</div>
                  <div className="font-semibold">Real-time Data</div>
                  <div>Current conditions and temperature</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="font-semibold">5-Day Forecast</div>
                  <div>Detailed weather predictions</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl mb-2">🌍</div>
                  <div className="font-semibold">Global Coverage</div>
                  <div>Weather data worldwide</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center py-6 text-blue-100"
      >
        <p className="text-sm">
          Powered by OpenWeatherMap API • Built with Next.js, React, and Tailwind CSS
        </p>
      </motion.footer>
    </div>
  );
}
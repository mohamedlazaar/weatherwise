import { create } from 'zustand';
import { WeatherStore } from '@/types/weather';
import { fetchWeatherData } from '@/lib/weather-api';

export const useWeatherStore = create<WeatherStore>((set, get) => ({
  // Initial state
  currentWeather: null,
  forecast: [],
  loading: false,
  error: null,
  searchQuery: '',

  // Actions
  setCurrentWeather: (weather) => set({ currentWeather: weather }),
  
  setForecast: (forecast) => set({ forecast }),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Async action to fetch weather data
  fetchWeatherData: async (city: string) => {
    const { setLoading, setError, setCurrentWeather, setForecast, setSearchQuery } = get();
    
    try {
      setLoading(true);
      setError(null);
      setSearchQuery(city);

      const { current, forecast } = await fetchWeatherData(city);
      
      setCurrentWeather(current);
      setForecast(forecast.list);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch weather data';
      setError(errorMessage);
      console.error('Weather fetch error:', error);
    } finally {
      setLoading(false);
    }
  },

  // Clear all weather data
  clearWeatherData: () => set({
    currentWeather: null,
    forecast: [],
    error: null,
    searchQuery: '',
  }),
}));

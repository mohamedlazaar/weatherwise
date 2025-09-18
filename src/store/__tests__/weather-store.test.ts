import { renderHook, act } from '@testing-library/react';
import { useWeatherStore } from '../weather-store';
import { CurrentWeather, ForecastItem } from '@/types/weather';

// Mock the weather API
jest.mock('@/lib/weather-api', () => ({
  fetchWeatherData: jest.fn(),
}));

const mockFetchWeatherData = require('@/lib/weather-api').fetchWeatherData;

describe('Weather Store', () => {
  beforeEach(() => {
    // Reset the store state before each test
    act(() => {
      useWeatherStore.getState().clearWeatherData();
    });
    jest.clearAllMocks();
  });

  it('should have initial state', () => {
    const { result } = renderHook(() => useWeatherStore());
    
    expect(result.current.currentWeather).toBeNull();
    expect(result.current.forecast).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.searchQuery).toBe('');
  });

  it('should set current weather', () => {
    const { result } = renderHook(() => useWeatherStore());
    const mockWeather: CurrentWeather = {
      coord: { lon: 0, lat: 0 },
      weather: [{ id: 1, main: 'Clear', description: 'clear sky', icon: '01d' }],
      base: 'stations',
      main: {
        temp: 25,
        feels_like: 27,
        temp_min: 20,
        temp_max: 30,
        pressure: 1013,
        humidity: 60,
      },
      visibility: 10000,
      wind: { speed: 5, deg: 180 },
      clouds: { all: 0 },
      dt: 1640995200,
      sys: {
        country: 'US',
        sunrise: 1640952000,
        sunset: 1640991600,
      },
      timezone: -18000,
      id: 123456,
      name: 'Test City',
      cod: 200,
    };

    act(() => {
      result.current.setCurrentWeather(mockWeather);
    });

    expect(result.current.currentWeather).toEqual(mockWeather);
  });

  it('should set forecast', () => {
    const { result } = renderHook(() => useWeatherStore());
    const mockForecast: ForecastItem[] = [
      {
        dt: 1640995200,
        main: {
          temp: 25,
          feels_like: 27,
          temp_min: 20,
          temp_max: 30,
          pressure: 1013,
          humidity: 60,
        },
        weather: [{ id: 1, main: 'Clear', description: 'clear sky', icon: '01d' }],
        clouds: { all: 0 },
        wind: { speed: 5, deg: 180 },
        visibility: 10000,
        pop: 0.1,
        sys: { pod: 'd' },
        dt_txt: '2022-01-01 12:00:00',
      },
    ];

    act(() => {
      result.current.setForecast(mockForecast);
    });

    expect(result.current.forecast).toEqual(mockForecast);
  });

  it('should set loading state', () => {
    const { result } = renderHook(() => useWeatherStore());

    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.loading).toBe(true);

    act(() => {
      result.current.setLoading(false);
    });

    expect(result.current.loading).toBe(false);
  });

  it('should set error', () => {
    const { result } = renderHook(() => useWeatherStore());
    const errorMessage = 'City not found';

    act(() => {
      result.current.setError(errorMessage);
    });

    expect(result.current.error).toBe(errorMessage);
  });

  it('should set search query', () => {
    const { result } = renderHook(() => useWeatherStore());
    const query = 'New York';

    act(() => {
      result.current.setSearchQuery(query);
    });

    expect(result.current.searchQuery).toBe(query);
  });

  it('should clear weather data', () => {
    const { result } = renderHook(() => useWeatherStore());

    // Set some data first
    act(() => {
      result.current.setCurrentWeather({} as CurrentWeather);
      result.current.setForecast([{} as ForecastItem]);
      result.current.setError('Some error');
      result.current.setSearchQuery('Test City');
    });

    // Clear the data
    act(() => {
      result.current.clearWeatherData();
    });

    expect(result.current.currentWeather).toBeNull();
    expect(result.current.forecast).toEqual([]);
    expect(result.current.error).toBeNull();
    expect(result.current.searchQuery).toBe('');
  });

  it('should handle successful weather data fetch', async () => {
    const { result } = renderHook(() => useWeatherStore());
    const mockWeatherData = {
      current: {} as CurrentWeather,
      forecast: { list: [{} as ForecastItem] },
    };

    mockFetchWeatherData.mockResolvedValue(mockWeatherData);

    await act(async () => {
      await result.current.fetchWeatherData('Test City');
    });

    expect(mockFetchWeatherData).toHaveBeenCalledWith('Test City');
    expect(result.current.currentWeather).toEqual(mockWeatherData.current);
    expect(result.current.forecast).toEqual(mockWeatherData.forecast.list);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.searchQuery).toBe('Test City');
  });

  it('should handle weather data fetch error', async () => {
    const { result } = renderHook(() => useWeatherStore());
    const errorMessage = 'City not found';

    mockFetchWeatherData.mockRejectedValue(new Error(errorMessage));

    await act(async () => {
      await result.current.fetchWeatherData('Invalid City');
    });

    expect(mockFetchWeatherData).toHaveBeenCalledWith('Invalid City');
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.loading).toBe(false);
    expect(result.current.searchQuery).toBe('Invalid City');
  });
});

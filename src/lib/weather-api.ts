import { CurrentWeather, ForecastResponse } from '@/types/weather';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

if (!API_KEY) {
  throw new Error('NEXT_PUBLIC_OPENWEATHER_API_KEY is not defined in environment variables');
}

class WeatherAPIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'WeatherAPIError';
  }
}

/**
 * Fetches current weather data for a given city
 * @param city - The city name to fetch weather for
 * @returns Promise<CurrentWeather> - Current weather data
 * @throws WeatherAPIError - If the API request fails
 */
export async function fetchCurrentWeather(city: string): Promise<CurrentWeather> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new WeatherAPIError(
        errorData.message || `Failed to fetch weather data: ${response.statusText}`,
        response.status
      );
    }

    const data: CurrentWeather = await response.json();
    return data;
  } catch (error) {
    if (error instanceof WeatherAPIError) {
      throw error;
    }
    throw new WeatherAPIError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Fetches 5-day weather forecast for a given city
 * @param city - The city name to fetch forecast for
 * @returns Promise<ForecastResponse> - 5-day forecast data
 * @throws WeatherAPIError - If the API request fails
 */
export async function fetchForecast(city: string): Promise<ForecastResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new WeatherAPIError(
        errorData.message || `Failed to fetch forecast data: ${response.statusText}`,
        response.status
      );
    }

    const data: ForecastResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof WeatherAPIError) {
      throw error;
    }
    throw new WeatherAPIError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Fetches both current weather and forecast data for a given city
 * @param city - The city name to fetch weather data for
 * @returns Promise<{current: CurrentWeather, forecast: ForecastResponse}> - Combined weather data
 * @throws WeatherAPIError - If any API request fails
 */
export async function fetchWeatherData(city: string): Promise<{
  current: CurrentWeather;
  forecast: ForecastResponse;
}> {
  try {
    const [current, forecast] = await Promise.all([
      fetchCurrentWeather(city),
      fetchForecast(city),
    ]);

    return { current, forecast };
  } catch (error) {
    if (error instanceof WeatherAPIError) {
      throw error;
    }
    throw new WeatherAPIError(`Failed to fetch weather data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Utility function to get weather icon URL
 * @param iconCode - The weather icon code from OpenWeatherMap
 * @returns string - Full URL to the weather icon
 */
export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

/**
 * Utility function to format temperature
 * @param temp - Temperature in Celsius
 * @param unit - Temperature unit ('C' or 'F')
 * @returns string - Formatted temperature string
 */
export function formatTemperature(temp: number, unit: 'C' | 'F' = 'C'): string {
  if (unit === 'F') {
    const fahrenheit = (temp * 9) / 5 + 32;
    return `${Math.round(fahrenheit)}°F`;
  }
  return `${Math.round(temp)}°C`;
}

/**
 * Utility function to format wind speed
 * @param speed - Wind speed in m/s
 * @param unit - Wind speed unit ('m/s', 'km/h', 'mph')
 * @returns string - Formatted wind speed string
 */
export function formatWindSpeed(speed: number, unit: 'm/s' | 'km/h' | 'mph' = 'm/s'): string {
  switch (unit) {
    case 'km/h':
      return `${Math.round(speed * 3.6)} km/h`;
    case 'mph':
      return `${Math.round(speed * 2.237)} mph`;
    default:
      return `${Math.round(speed)} m/s`;
  }
}

/**
 * Utility function to get wind direction from degrees
 * @param degrees - Wind direction in degrees
 * @returns string - Wind direction (N, NE, E, SE, S, SW, W, NW)
 */
export function getWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

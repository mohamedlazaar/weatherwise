import { 
  formatTemperature, 
  formatWindSpeed, 
  getWindDirection, 
  getWeatherIconUrl 
} from '../weather-api';

describe('Weather API Utilities', () => {
  describe('formatTemperature', () => {
    it('should format temperature in Celsius by default', () => {
      expect(formatTemperature(25.7)).toBe('26°C');
      expect(formatTemperature(0)).toBe('0°C');
      expect(formatTemperature(-5.3)).toBe('-5°C');
    });

    it('should format temperature in Fahrenheit when specified', () => {
      expect(formatTemperature(25, 'F')).toBe('77°F');
      expect(formatTemperature(0, 'F')).toBe('32°F');
      expect(formatTemperature(-5, 'F')).toBe('23°F');
    });
  });

  describe('formatWindSpeed', () => {
    it('should format wind speed in m/s by default', () => {
      expect(formatWindSpeed(5.5)).toBe('6 m/s');
      expect(formatWindSpeed(0)).toBe('0 m/s');
    });

    it('should format wind speed in km/h when specified', () => {
      expect(formatWindSpeed(5.5, 'km/h')).toBe('20 km/h');
      expect(formatWindSpeed(10, 'km/h')).toBe('36 km/h');
    });

    it('should format wind speed in mph when specified', () => {
      expect(formatWindSpeed(5.5, 'mph')).toBe('12 mph');
      expect(formatWindSpeed(10, 'mph')).toBe('22 mph');
    });
  });

  describe('getWindDirection', () => {
    it('should return correct wind direction for given degrees', () => {
      expect(getWindDirection(0)).toBe('N');
      expect(getWindDirection(45)).toBe('NE');
      expect(getWindDirection(90)).toBe('E');
      expect(getWindDirection(135)).toBe('SE');
      expect(getWindDirection(180)).toBe('S');
      expect(getWindDirection(225)).toBe('SW');
      expect(getWindDirection(270)).toBe('W');
      expect(getWindDirection(315)).toBe('NW');
    });

    it('should handle edge cases', () => {
      expect(getWindDirection(360)).toBe('N');
      expect(getWindDirection(22.5)).toBe('N');
      expect(getWindDirection(67.5)).toBe('E');
    });
  });

  describe('getWeatherIconUrl', () => {
    it('should return correct OpenWeatherMap icon URL', () => {
      expect(getWeatherIconUrl('01d')).toBe('https://openweathermap.org/img/wn/01d@2x.png');
      expect(getWeatherIconUrl('10n')).toBe('https://openweathermap.org/img/wn/10n@2x.png');
    });
  });
});

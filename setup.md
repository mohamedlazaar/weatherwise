# WeatherWise Setup Guide

## Quick Start

1. **Get an API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Get your API key from the dashboard

2. **Set up Environment Variables**
   ```bash
   # Create .env.local file
   echo "NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here" > .env.local
   ```

3. **Install and Run**
   ```bash
   npm install
   npm run dev
   ```

4. **Open Browser**
   - Navigate to http://localhost:3000
   - Search for any city to see the weather!

## Features to Try

- Search for different cities (e.g., "London", "Tokyo", "New York")
- View current weather conditions
- Check the 5-day forecast
- See hourly weather for today
- Test on mobile devices for responsive design

## Troubleshooting

- **API Key Issues**: Make sure your API key is correctly set in `.env.local`
- **Build Errors**: Run `npm run build` to check for TypeScript errors
- **Test Failures**: Run `npm test` to verify all tests pass

## Development

- **Run Tests**: `npm test`
- **Run Tests with Coverage**: `npm run test:coverage`
- **Lint Code**: `npm run lint`
- **Build for Production**: `npm run build`

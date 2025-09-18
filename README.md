# 🌤️ WeatherWise

A modern, responsive weather dashboard web application built with Next.js, React, and Tailwind CSS. Get instant weather updates and forecasts for any city worldwide using the OpenWeatherMap API.

![WeatherWise Screenshot](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=WeatherWise+Dashboard)

## ✨ Features

- **Real-time Weather Data**: Current weather conditions with detailed metrics
- **5-Day Forecast**: Comprehensive weather predictions with hourly breakdowns
- **Global Coverage**: Search for weather in any city worldwide
- **Responsive Design**: Beautiful UI that works on desktop and mobile
- **Smooth Animations**: Framer Motion powered transitions and effects
- **TypeScript Support**: Full type safety throughout the application
- **Comprehensive Testing**: Unit tests for components and utilities

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+, React 19, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **API**: OpenWeatherMap REST API
- **Testing**: Jest, React Testing Library
- **AI/Dev Tools**: Cursor IDE, AI-powered development

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weatherwise.git
   cd weatherwise
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your OpenWeatherMap API key:
   ```env
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── __tests__/         # Component tests
│   ├── ErrorMessage.tsx   # Error display component
│   ├── ForecastList.tsx   # 5-day forecast component
│   ├── LoadingSpinner.tsx # Loading state component
│   ├── SearchBar.tsx      # City search component
│   └── WeatherCard.tsx    # Current weather display
├── lib/                   # Utility functions
│   ├── __tests__/         # Utility tests
│   └── weather-api.ts     # OpenWeatherMap API client
├── store/                 # State management
│   ├── __tests__/         # Store tests
│   └── weather-store.ts   # Zustand weather store
└── types/                 # TypeScript type definitions
    └── weather.ts         # Weather API types
```

## 🎨 Key Components

### SearchBar
- City search input with real-time validation
- Loading states and error handling
- Responsive design with smooth animations

### WeatherCard
- Current weather conditions display
- Temperature, humidity, wind speed, and more
- Sunrise/sunset times and weather icons
- Responsive grid layout

### ForecastList
- 5-day weather forecast
- Hourly breakdown for today
- Weather condition icons and probability of precipitation
- Grouped by date with min/max temperatures

## 🤖 AI Development Process

This project was built using AI-assisted development techniques:

### AI Tools Used
- **Cursor IDE**: AI-powered code generation and suggestions
- **CodeRabbit**: Automated code reviews and PR assistance
- **AI Prompts**: Schema-aware API integration and component scaffolding

### AI-Generated Features
- TypeScript interfaces for OpenWeatherMap API responses
- Reusable React components with Tailwind CSS styling
- Comprehensive test suites for components and utilities
- API client functions with error handling
- Zustand store implementation for state management

### Prompting Strategies Applied
- **API-Aware Generation**: Provided OpenWeatherMap API documentation to generate typed fetch functions
- **Component Scaffolding**: Used AI to create responsive, accessible React components
- **Test Generation**: AI-generated unit tests covering success and error cases
- **Code Review**: AI-assisted code improvements and best practices

## 🌐 API Integration

The app integrates with the OpenWeatherMap API:

- **Current Weather**: Real-time weather data for any city
- **5-Day Forecast**: Detailed weather predictions
- **Error Handling**: Comprehensive error states and user feedback
- **Type Safety**: Full TypeScript support for API responses

## 📱 Responsive Design

- Mobile-first approach with Tailwind CSS
- Responsive grid layouts for all screen sizes
- Touch-friendly interface elements
- Optimized for both desktop and mobile experiences

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for the weather API
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide React](https://lucide.dev/) for icons

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Review the test files for usage examples

---

**Built with ❤️ using AI-assisted development**
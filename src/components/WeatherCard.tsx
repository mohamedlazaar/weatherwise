'use client';

import { motion } from 'framer-motion';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Sunrise, 
  Sunset,
  Cloud,
  Sun,
  CloudRain,
  Snowflake,
  Zap
} from 'lucide-react';
import { CurrentWeather } from '@/types/weather';
import { getWeatherIconUrl, formatTemperature, formatWindSpeed, getWindDirection } from '@/lib/weather-api';

interface WeatherCardProps {
  weather: CurrentWeather;
  className?: string;
}

export default function WeatherCard({ weather, className = '' }: WeatherCardProps) {
  const { main, weather: conditions, wind, visibility, clouds, sys } = weather;
  const condition = conditions[0];

  const getWeatherIcon = (iconCode: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      '01d': Sun,
      '01n': Sun,
      '02d': Cloud,
      '02n': Cloud,
      '03d': Cloud,
      '03n': Cloud,
      '04d': Cloud,
      '04n': Cloud,
      '09d': CloudRain,
      '09n': CloudRain,
      '10d': CloudRain,
      '10n': CloudRain,
      '11d': Zap,
      '11n': Zap,
      '13d': Snowflake,
      '13n': Snowflake,
    };
    
    const IconComponent = iconMap[iconCode] || Cloud;
    return <IconComponent className="w-16 h-16 text-yellow-500" />;
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`bg-white rounded-xl shadow-lg p-6 ${className}`}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{weather.name}</h2>
        <p className="text-gray-600 capitalize">{condition.description}</p>
      </div>

      {/* Main Weather Display */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-4">
          {getWeatherIcon(condition.icon)}
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-800">
              {formatTemperature(main.temp)}
            </div>
            <div className="text-gray-600">
              Feels like {formatTemperature(main.feels_like)}
            </div>
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <Thermometer className="w-6 h-6 text-blue-600 mx-auto mb-1" />
          <div className="text-sm text-gray-600">Min/Max</div>
          <div className="font-semibold text-gray-800">
            {formatTemperature(main.temp_min)} / {formatTemperature(main.temp_max)}
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <Droplets className="w-6 h-6 text-blue-600 mx-auto mb-1" />
          <div className="text-sm text-gray-600">Humidity</div>
          <div className="font-semibold text-gray-800">{main.humidity}%</div>
        </div>

        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <Wind className="w-6 h-6 text-blue-600 mx-auto mb-1" />
          <div className="text-sm text-gray-600">Wind</div>
          <div className="font-semibold text-gray-800">
            {formatWindSpeed(wind.speed)} {getWindDirection(wind.deg)}
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <Eye className="w-6 h-6 text-blue-600 mx-auto mb-1" />
          <div className="text-sm text-gray-600">Visibility</div>
          <div className="font-semibold text-gray-800">
            {(visibility / 1000).toFixed(1)} km
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Gauge className="w-5 h-5 text-gray-600 mr-2" />
              <span className="text-sm text-gray-600">Pressure</span>
            </div>
            <span className="font-semibold text-gray-800">{main.pressure} hPa</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Cloud className="w-5 h-5 text-gray-600 mr-2" />
              <span className="text-sm text-gray-600">Cloudiness</span>
            </div>
            <span className="font-semibold text-gray-800">{clouds.all}%</span>
          </div>
        </div>
      </div>

      {/* Sunrise/Sunset */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="flex items-center text-orange-500">
          <Sunrise className="w-5 h-5 mr-2" />
          <div>
            <div className="text-sm text-gray-600">Sunrise</div>
            <div className="font-semibold">{formatTime(sys.sunrise)}</div>
          </div>
        </div>
        <div className="flex items-center text-orange-500">
          <Sunset className="w-5 h-5 mr-2" />
          <div>
            <div className="text-sm text-gray-600">Sunset</div>
            <div className="font-semibold">{formatTime(sys.sunset)}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

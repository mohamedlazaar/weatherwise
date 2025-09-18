'use client';

import { motion } from 'framer-motion';
import { ForecastItem } from '@/types/weather';
import { formatTemperature, getWeatherIconUrl } from '@/lib/weather-api';
import { Cloud, Sun, CloudRain, Snowflake, Zap } from 'lucide-react';

interface ForecastListProps {
  forecast: ForecastItem[];
  className?: string;
}

export default function ForecastList({ forecast, className = '' }: ForecastListProps) {
  // Group forecast items by date
  const groupedForecast = forecast.reduce((acc, item) => {
    const date = new Date(item.dt_txt).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as Record<string, ForecastItem[]>);

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
    return <IconComponent className="w-6 h-6" />;
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    }
  };

  const getMinMaxTemp = (dayForecast: ForecastItem[]) => {
    const temps = dayForecast.map(item => item.main.temp);
    return {
      min: Math.min(...temps),
      max: Math.max(...temps),
    };
  };

  const getMostCommonCondition = (dayForecast: ForecastItem[]) => {
    const conditions = dayForecast.map(item => item.weather[0]);
    const conditionCounts = conditions.reduce((acc, condition) => {
      acc[condition.main] = (acc[condition.main] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostCommon = Object.entries(conditionCounts).reduce((a, b) => 
      conditionCounts[a[0]] > conditionCounts[b[0]] ? a : b
    );

    return conditions.find(c => c.main === mostCommon[0]) || conditions[0];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className={`bg-white rounded-xl shadow-lg p-6 ${className}`}
    >
      <h3 className="text-xl font-bold text-gray-800 mb-6">5-Day Forecast</h3>
      
      <div className="space-y-4">
        {Object.entries(groupedForecast).slice(0, 5).map(([date, dayForecast], index) => {
          const minMax = getMinMaxTemp(dayForecast);
          const condition = getMostCommonCondition(dayForecast);
          
          return (
            <motion.div
              key={date}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="text-gray-600 font-medium min-w-[80px]">
                  {formatDate(dayForecast[0].dt_txt)}
                </div>
                <div className="flex items-center space-x-2">
                  {getWeatherIcon(condition.icon)}
                  <span className="text-gray-600 capitalize text-sm">
                    {condition.description}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="font-semibold text-gray-800">
                    {formatTemperature(minMax.max)} / {formatTemperature(minMax.min)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.round(dayForecast[0].pop * 100)}% chance of rain
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Hourly forecast for today */}
      {groupedForecast[Object.keys(groupedForecast)[0]] && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Today's Hourly Forecast</h4>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {groupedForecast[Object.keys(groupedForecast)[0]]
              .slice(0, 8)
              .map((item, index) => (
                <motion.div
                  key={item.dt_txt}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="flex-shrink-0 text-center p-3 rounded-lg bg-gray-50 min-w-[80px]"
                >
                  <div className="text-sm text-gray-600 mb-1">
                    {formatTime(item.dt_txt)}
                  </div>
                  <div className="flex justify-center mb-2">
                    {getWeatherIcon(item.weather[0].icon)}
                  </div>
                  <div className="font-semibold text-gray-800">
                    {formatTemperature(item.main.temp)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.round(item.pop * 100)}%
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

'use client';
import React, { useMemo } from 'react';
import { Sun, Droplet, Wind, Waves, Cloud } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const CURRENT_WEATHER = {
  location: 'Playa del Carmen',
  tempF: 82,
  condition: 'Partly Cloudy',
  humidity: 72,
  windSpeed: '8 mph NE',
  seaConditions: 'Excellent',
};

const MONTHLY_TEMPS = [
  { month: 'Jan', temp: 76 },
  { month: 'Feb', temp: 76 },
  { month: 'Mar', temp: 78 },
  { month: 'Apr', temp: 80 },
  { month: 'May', temp: 82 },
  { month: 'Jun', temp: 84 },
  { month: 'Jul', temp: 85 },
  { month: 'Aug', temp: 86 },
  { month: 'Sep', temp: 85 },
  { month: 'Oct', temp: 82 },
  { month: 'Nov', temp: 79 },
  { month: 'Dec', temp: 77 },
];

const DAILY_FORECAST = [
  { day: 'Tomorrow', icon: Sun, high: 84, low: 76, condition: 'Sunny' },
  { day: 'Sunday', icon: Cloud, high: 83, low: 75, condition: 'Partly Cloudy' },
  { day: 'Monday', icon: Sun, high: 85, low: 77, condition: 'Sunny' },
];

// Calculate dynamic height and color based on temperature - memoized
const getTempStyle = (temp: number) => {
  const minTemp = 76;
  const maxTemp = 86;
  
  const minHeight = 30;
  const maxHeight = 100;
  const heightPercent = minHeight + ((temp - minTemp) / (maxTemp - minTemp)) * (maxHeight - minHeight);
  
  let color = 'from-blue-400 to-blue-500';
  if (temp >= 85) color = 'from-orange-500 to-red-500';
  else if (temp >= 84) color = 'from-orange-400 to-orange-600';
  else if (temp >= 82) color = 'from-orange-300 to-orange-500';
  else if (temp >= 80) color = 'from-blue-500 to-blue-600';
  else if (temp >= 78) color = 'from-blue-400 to-blue-600';
  else if (temp >= 77) color = 'from-blue-300 to-blue-500';
  
  return { height: `${heightPercent}%`, color };
};

// --- Optimized Framer Motion Variants ---

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.35, 
      ease: [0.25, 0.46, 0.45, 0.94]
    },
  },
};

const barVariants: Variants = {
  hidden: { 
    scaleY: 0,
    opacity: 0,
  },
  visible: (i: number) => ({
    scaleY: 1,
    opacity: 1,
    transition: {
      delay: i * 0.04,
      duration: 0.55,
      ease: [0.34, 1.25, 0.64, 1],
    },
  }),
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04 + 0.25,
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }),
};

// --- Optimized Components with React.memo ---

const ForecastCard: React.FC<{ day: string; icon: React.ElementType; high: number; low: number }> = React.memo(({ day, icon: Icon, high, low }) => (
  <motion.div 
    variants={itemVariants} 
    className="flex flex-col items-center space-y-2 p-3 sm:p-4 border-r border-gray-100 last:border-r-0 flex-1 hover:bg-blue-50 transition-colors duration-200"
  >
    <span className="text-xs sm:text-sm font-medium text-gray-500">{day}</span>
    <motion.div
      whileHover={{ scale: 1.15, rotate: 12 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-yellow-500" />
    </motion.div>
    <span className="text-xs sm:text-sm font-semibold text-gray-800">
      {high}° / <span className="text-gray-500 font-normal">{low}°</span>
    </span>
  </motion.div>
));

ForecastCard.displayName = 'ForecastCard';

const TempBar: React.FC<{ month: string; temp: number; index: number }> = React.memo(({ month, temp, index }) => {
  const { height, color } = useMemo(() => getTempStyle(temp), [temp]);
  
  return (
    <div className="flex flex-col items-center w-full h-full justify-end relative group">
      <div className="relative w-4 sm:w-5 flex-1 flex items-end">
        <motion.div
          className={`w-full rounded-t-lg sm:rounded-t-xl bg-linear-to-t ${color} absolute bottom-0 left-0 origin-bottom shadow-md group-hover:shadow-xl transition-shadow duration-200`}
          style={{ height }}
          custom={index}
          variants={barVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3, margin: "0px 0px -50px 0px" }}
          whileHover={{ scaleX: 1.15, transition: { duration: 0.2 } }}
        >
          <motion.div
            className="absolute inset-0 bg-linear-to-t from-white/0 via-white/20 to-white/40 rounded-t-lg sm:rounded-t-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.04 + 0.35, duration: 0.3 }}
          />
        </motion.div>
      </div>
      <motion.span 
        className="text-[10px] sm:text-xs font-bold text-gray-800 mt-1.5 sm:mt-2"
        custom={index}
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3, margin: "0px 0px -50px 0px" }}
      >
        {temp}°
      </motion.span>
      <motion.span 
        className="text-[10px] sm:text-xs text-gray-500 font-medium mt-0.5"
        custom={index}
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3, margin: "0px 0px -50px 0px" }}
      >
        {month}
      </motion.span>
    </div>
  );
});

TempBar.displayName = 'TempBar';

const WeatherForecast: React.FC = () => {
  return (
    <div className="p-3 sm:p-6 md:p-8 lg:p-10 bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex justify-center items-start min-h-screen">
      <div className="w-full max-w-6xl rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl hover:shadow-3xl transition-all duration-500">

        {/* Header */}
        <motion.header
          className="mb-4 sm:mb-6 flex items-center space-x-2 sm:space-x-3"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            <Sun className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
          </motion.div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-800">Current Weather</h2>
            <p className="text-xs sm:text-sm text-gray-500">{CURRENT_WEATHER.location}</p>
          </div>
        </motion.header>

        {/* Temperature */}
        <motion.div
          className="text-center mb-4 sm:mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.6, 
            delay: 0.1,
            ease: [0.34, 1.56, 0.64, 1]
          }}
        >
          <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight text-gray-900 leading-none bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text">
            {CURRENT_WEATHER.tempF}°F
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-2 font-medium">{CURRENT_WEATHER.condition}</p>
        </motion.div>

        {/* Metrics */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-700 mb-6 sm:mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div className="flex items-center space-x-2 bg-blue-50 p-2.5 sm:p-3 rounded-lg" variants={itemVariants}>
            <Droplet className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 shrink-0" />
            <span className="font-semibold">Humidity:</span>
            <span className="font-bold text-blue-600">{CURRENT_WEATHER.humidity}%</span>
          </motion.div>
          <motion.div className="flex items-center space-x-2 bg-blue-50 p-2.5 sm:p-3 rounded-lg" variants={itemVariants}>
            <Wind className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 shrink-0" />
            <span className="font-semibold">Wind Speed:</span>
            <span className="font-bold text-blue-600">{CURRENT_WEATHER.windSpeed}</span>
          </motion.div>
          <motion.div className="flex items-center space-x-2 bg-green-50 p-2.5 sm:p-3 rounded-lg sm:col-span-2 lg:col-span-1" variants={itemVariants}>
            <Waves className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 shrink-0" />
            <span className="font-semibold">Sea Conditions:</span>
            <span className="font-bold text-green-600">{CURRENT_WEATHER.seaConditions}</span>
          </motion.div>
        </motion.div>

        {/* Year Overview Diagram */}
        <motion.h3 
          className="text-sm sm:text-base font-bold text-gray-800 mb-3 sm:mb-4 border-t-2 border-gray-200 pt-4 sm:pt-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Year Overview Diagram
        </motion.h3>
        <div className="flex justify-between items-end h-40 sm:h-48 md:h-56 lg:h-64 pb-2 border-b-2 border-gray-200 gap-1 sm:gap-1.5 md:gap-2 px-1 sm:px-2">
          {MONTHLY_TEMPS.map((data, index) => (
            <TempBar key={data.month} month={data.month} temp={data.temp} index={index} />
          ))}
        </div>

        {/* 3-Day Forecast */}
        <motion.h3 
          className="text-sm sm:text-base font-bold text-gray-800 mt-6 sm:mt-8 mb-3 sm:mb-4 border-t-2 border-gray-200 pt-4 sm:pt-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Weather Forecast Diagram
        </motion.h3>
        <motion.div
          className="flex flex-col sm:flex-row justify-between rounded-xl border-2 border-gray-200 overflow-hidden bg-linear-to-br from-white to-blue-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {DAILY_FORECAST.map((forecast) => (
            <ForecastCard key={forecast.day} day={forecast.day} icon={forecast.icon} high={forecast.high} low={forecast.low} />
          ))}
        </motion.div>

        {/* Forecast Summary */}
        <motion.div
          className="mt-4 sm:mt-6 p-3 sm:p-4 bg-linear-to-r from-blue-50 to-purple-50 rounded-xl"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-xs sm:text-sm font-bold text-gray-800 mb-2 sm:mb-3">Detailed Forecast:</p>
          <div className="text-xs sm:text-sm text-gray-700 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            <motion.p 
              className="bg-white p-2 rounded-lg shadow-sm"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              ☀️ Tomorrow: <span className="font-semibold">{DAILY_FORECAST[0].high}°F / {DAILY_FORECAST[0].low}°F</span>
            </motion.p>
            <motion.p 
              className="bg-white p-2 rounded-lg shadow-sm"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              🌤️ Sunday: <span className="font-semibold">{DAILY_FORECAST[1].high}°F / {DAILY_FORECAST[1].low}°F</span>
            </motion.p>
            <motion.p 
              className="bg-white p-2 rounded-lg shadow-sm"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              ☀️ Monday: <span className="font-semibold">{DAILY_FORECAST[2].high}°F / {DAILY_FORECAST[2].low}°F</span>
            </motion.p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default WeatherForecast;
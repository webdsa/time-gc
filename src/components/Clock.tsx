import { useState, useEffect } from 'react';
import { 
  getTranslation, 
  getLocalizedCityName, 
  formatLocalizedDate, 
  getLocalizedLabel 
} from '../i18n/translations';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface ClockProps {
  timezone: string;
  label?: string;
  fullscreen?: boolean;
  cityName?: string;
  showDate?: boolean;
}

const Clock: React.FC<ClockProps> = ({ 
  timezone, 
  label, 
  fullscreen = false, 
  cityName,
  showDate = false 
}) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentDate(now);
      
      const timeOptions: Intl.DateTimeFormatOptions = {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      
      const timeFormat = getTranslation('time_format', language) as string;
      const timeString = new Intl.DateTimeFormat(timeFormat, timeOptions).format(now);
      
      // Get localized date string using our custom function
      const dateInTimezone = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
      const localizedDate = formatLocalizedDate(dateInTimezone, language);
      
      setTime(timeString);
      setDate(localizedDate);
    };
    
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    
    return () => clearInterval(intervalId);
  }, [timezone, language]);
  
  const [hours, minutes, seconds] = time.split(':');
  
  const containerClasses = fullscreen 
    ? "min-h-screen flex items-center justify-center relative"
    : "flex items-center justify-center";

  const timeClasses = fullscreen
    ? "text-8xl md:text-[10rem] lg:text-[13.5rem] font-bold tracking-tight"
    : "text-4xl md:text-5xl font-bold tracking-tight";

  const cityNameClasses = fullscreen
    ? "text-4xl md:text-5xl mb-8 text-neutral-600 dark:text-neutral-300 font-semibold"
    : "text-xl mb-4 text-neutral-600 dark:text-neutral-400 font-semibold";

  const dateClasses = fullscreen
    ? "text-2xl md:text-3xl mt-8 text-neutral-500 dark:text-neutral-400 font-medium"
    : "text-base mt-4 text-neutral-600 dark:text-neutral-500 font-medium";
  
  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center">
        {label && (
          <h2 className="text-2xl md:text-3xl mb-8 text-neutral-600 dark:text-neutral-400 font-semibold">
            {getLocalizedLabel(label, language)}
          </h2>
        )}
        
        {cityName && (
          <h1 className={cityNameClasses}>
            {getLocalizedCityName(cityName, language)}
          </h1>
        )}
        
        <div className={timeClasses}>
          <span className="text-neutral-700 dark:text-neutral-300">{hours}</span>
          <span className="separator px-2 text-neutral-600 dark:text-neutral-500">:</span>
          <span className="text-neutral-600 dark:text-neutral-400">{minutes}</span>
          <span className="separator px-2 text-neutral-600 dark:text-neutral-500">:</span>
          <span className="text-neutral-500 dark:text-neutral-500">{seconds}</span>
        </div>
        
        {showDate && (
          <p className={dateClasses}>
            {date}
          </p>
        )}
      </div>
    </div>
  );
};

export default Clock;
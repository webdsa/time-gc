import { Sun, Moon } from 'lucide-react';
import Clock from '../components/Clock';
import { useTheme } from '../context/ThemeContext';

const StLouisClock = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative">
      <button 
        onClick={toggleTheme} 
        className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-[rgba(50,50,50,0.5)] text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-[rgba(70,70,70,0.7)] transition-colors z-10"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      <Clock 
        timezone="America/Chicago" 
        fullscreen 
        cityName="St. Louis"
        showDate
      />
    </div>
  );
};

export default StLouisClock;
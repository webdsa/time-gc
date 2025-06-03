import React from 'react';
import { Link } from 'react-router-dom';
import { Clock as ClockIcon, Sun, Moon } from 'lucide-react';
import Clock from '../components/Clock';
import LanguageSelector from '../components/LanguageSelector';
import { 
  getLocalizedHomeText, 
  getLocalizedCountry 
} from '../i18n/translations';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const Home: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  const southAmericanClocks = [
    { country: 'Argentina', timezone: 'America/Argentina/Buenos_Aires' },
    { country: 'Bolivia', timezone: 'America/La_Paz' },
    { country: 'Chile', timezone: 'America/Santiago' },
    { country: 'Ecuador', timezone: 'America/Guayaquil' },
    { country: 'Paraguay', timezone: 'America/Asuncion' },
    { country: 'Peru', timezone: 'America/Lima' },
    { country: 'Uruguay', timezone: 'America/Montevideo' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4 flex gap-4">
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <LanguageSelector 
          currentLanguage={language}
          onLanguageChange={setLanguage}
        />
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center text-neutral-700 dark:text-neutral-300">
        {getLocalizedHomeText("Multi-Timezone Clock", language)}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full mb-12">
        <div className="flex flex-col items-center p-8 rounded-xl bg-white shadow-lg dark:shadow-none dark:bg-opacity-10 ">
          <ClockIcon className="w-12 h-12 mb-4 text-neutral-600 dark:text-neutral-400" />
          <h2 className="text-2xl font-semibold mb-6 text-neutral-600 dark:text-neutral-300">
            Brasília
          </h2>
          <Clock timezone="America/Sao_Paulo" />
          <Link 
            to="/brasilia" 
            className="mt-8 px-6 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-200 border border-neutral-400 dark:border-neutral-700 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300"
          >
            {getLocalizedHomeText("View Fullscreen", language)}
          </Link>
        </div>
        
        <div className="flex flex-col items-center p-8 rounded-xl bg-white shadow-lg dark:shadow-none dark:bg-opacity-10">
          <ClockIcon className="w-12 h-12 mb-4 text-neutral-600 dark:text-neutral-400" />
          <h2 className="text-2xl font-semibold mb-6 text-neutral-600 dark:text-neutral-300">
            St. Louis
          </h2>
          <Clock timezone="America/Chicago" />
          <Link 
            to="/stlouis" 
            className="mt-8 px-6 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-200 border border-neutral-400 dark:border-neutral-700 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300"
          >
            {getLocalizedHomeText("View Fullscreen", language)}
          </Link>
        </div>
      </div>

      <div className="w-full max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-neutral-600 dark:text-neutral-300">
          {getLocalizedHomeText("South American Time Zones", language)}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {southAmericanClocks.map(({ country, timezone }) => (
            <div key={country} className="flex flex-col items-center p-6 rounded-xl bg-white shadow-md dark:shadow-none dark:bg-opacity-10">
              <h3 className="text-xl font-semibold mb-4 text-neutral-600 dark:text-neutral-300">
                {getLocalizedCountry(country, language)}
              </h3>
              <Clock timezone={timezone} />
            </div>
          ))}
        </div>
      </div>
      
      <p className="mt-12 text-neutral-600 dark:text-neutral-500 text-center max-w-lg">
        {getLocalizedHomeText("Click \"View Fullscreen\" to see each clock in a distraction-free interface.", language)}
      </p>
    </div>
  );
};

export default Home;
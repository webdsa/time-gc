import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock as ClockIcon, Sun, Moon, Monitor, Users, MapPin } from 'lucide-react';
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
  const { theme, toggleTheme, systemPreference } = useTheme();
  const navigate = useNavigate();
  
  // Estado para armazenar os grupos de países por fuso horário
  const [timeGroups, setTimeGroups] = useState<Record<string, any[]>>({});
  const [sortedTimes, setSortedTimes] = useState<string[]>([]);
  
  // Função para restaurar a preferência do sistema
  const restoreSystemPreference = () => {
    if (systemPreference && theme !== systemPreference) {
      toggleTheme();
    }
  };
  
  const southAmericanClocks = [
    { country: 'Argentina', code: 'AR', timezone: 'America/Argentina/Buenos_Aires' },
    { country: 'Bolivia', code: 'BO', timezone: 'America/La_Paz' },
    { country: 'Chile', code: 'CL', timezone: 'America/Santiago' },
    { country: 'Ecuador', code: 'EC', timezone: 'America/Guayaquil' },
    { country: 'Paraguay', code: 'PY', timezone: 'America/Asuncion' },
    { country: 'Peru', code: 'PE', timezone: 'America/Lima' },
    { country: 'Uruguay', code: 'UY', timezone: 'America/Montevideo' },
  ];

  // Função para obter a hora atual em um fuso horário específico
  const getCurrentTime = (timezone: string): string => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
    };
    return now.toLocaleTimeString('en-US', options);
  };
  
  // Função para gerar um ID único para cada fuso horário
  const generateTimezoneId = (timezone: string): string => {
    // Converter para lowercase e substituir "/" por "_" para criar um ID seguro para URL
    return timezone.toLowerCase().replace(/\//g, '_');
  };
  
  // Função para navegar para a página do relógio em tela cheia
  const navigateToFullscreen = (timezone: string, clocks: any[]) => {
    // Armazenar os dados do grupo de fuso horário no sessionStorage
    const timezoneData = {
      timezone,
      countries: clocks.map(c => ({ 
        country: c.country, 
        code: c.code,
        timezone: c.timezone 
      }))
    };
    sessionStorage.setItem('timezone_data', JSON.stringify(timezoneData));
    
    // Navegar para a página do relógio em tela cheia
    navigate(`/timezone/${generateTimezoneId(timezone)}`);
  };

  // Agrupar países por fuso horário
  useEffect(() => {
    const groupCountries = () => {
      const groups: Record<string, any[]> = {};
      
      southAmericanClocks.forEach(clock => {
        // Usar apenas hora e minuto como chave de agrupamento
        const timeKey = getCurrentTime(clock.timezone);
        
        if (!groups[timeKey]) {
          groups[timeKey] = [];
        }
        
        groups[timeKey].push(clock);
      });
      
      // Ordenar as chaves de tempo (convertendo para objeto Date para ordenação correta)
      const times = Object.keys(groups);
      times.sort((a, b) => {
        const [hoursA, minutesA, periodA] = a.split(/:|\s/);
        const [hoursB, minutesB, periodB] = b.split(/:|\s/);
        
        // Converter para formato 24h para ordenação
        let hoursNumA = parseInt(hoursA);
        let hoursNumB = parseInt(hoursB);
        
        if (periodA === 'PM' && hoursNumA !== 12) hoursNumA += 12;
        if (periodA === 'AM' && hoursNumA === 12) hoursNumA = 0;
        if (periodB === 'PM' && hoursNumB !== 12) hoursNumB += 12;
        if (periodB === 'AM' && hoursNumB === 12) hoursNumB = 0;
        
        // Comparar horas
        if (hoursNumA !== hoursNumB) {
          return hoursNumA - hoursNumB;
        }
        
        // Se horas iguais, comparar minutos
        return parseInt(minutesA) - parseInt(minutesB);
      });
      
      setTimeGroups(groups);
      setSortedTimes(times);
    };
    
    // Agrupar inicialmente
    groupCountries();
    
    // Atualizar o agrupamento a cada minuto
    const intervalId = setInterval(groupCountries, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4 flex gap-4">
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        {/* Botão para restaurar preferência do sistema (apenas mostrado se diferente do tema atual) */}
        {systemPreference && theme !== systemPreference && (
          <button 
            onClick={restoreSystemPreference} 
            className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
            aria-label="Use system preference"
            title={`Use system preference (${systemPreference} mode)`}
          >
            <Monitor size={20} />
          </button>
        )}
        
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Renderiza os grupos de países por fuso horário */}
          {sortedTimes.map((time) => {
            const clocks = timeGroups[time];
            // Usar o primeiro timezone do grupo para o relógio
            const representativeTimezone = clocks[0].timezone;
            
            return (
              <div 
                key={time} 
                className="flex flex-col items-center p-6 rounded-xl bg-white shadow-md dark:shadow-none dark:bg-opacity-10 cursor-pointer hover:shadow-lg dark:hover:bg-opacity-20 transition-all duration-300"
                onClick={() => navigateToFullscreen(representativeTimezone, clocks)}
              >
                <Clock timezone={representativeTimezone} />
                
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  {clocks.map((clock) => (
                    <div 
                      key={clock.country} 
                      className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-sm font-medium flex items-center"
                      title={getLocalizedCountry(clock.country, language)}
                    >
                      <MapPin size={14} className="mr-1 text-neutral-500 dark:text-neutral-400" />
                      {clock.code}
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                  {getLocalizedHomeText("Click to view fullscreen", language)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <p className="mt-12 text-neutral-600 dark:text-neutral-500 text-center max-w-lg">
        {getLocalizedHomeText("Click \"View Fullscreen\" to see each clock in a distraction-free interface.", language)}
      </p>
    </div>
  );
};

export default Home;
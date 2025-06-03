import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Monitor, ArrowLeft, MapPin, Globe } from 'lucide-react';
import Clock from '../components/Clock';
import { useTheme } from '../context/ThemeContext';
import { getLocalizedCountry, formatLocalizedDate, getTranslation, getLocalizedHomeText } from '../i18n/translations';
import { useLanguage } from '../context/LanguageContext';

// Interface para os dados do fuso horário
interface TimezoneData {
  timezone: string;
  countries: {
    country: string;
    code: string;
    timezone: string;
  }[];
}

// Mapeamento de timezones para países
const TIMEZONE_MAPPINGS: Record<string, {country: string, code: string, timezone: string}[]> = {
  // UTC-3 (Argentina, Brasília, Uruguai)
  'america_argentina_buenos_aires': [
    { country: 'Argentina', code: 'AR', timezone: 'America/Argentina/Buenos_Aires' },
    { country: 'Uruguay', code: 'UY', timezone: 'America/Montevideo' },
    { country: 'Brazil', code: 'BR', timezone: 'America/Sao_Paulo' }
  ],
  'america_montevideo': [
    { country: 'Uruguay', code: 'UY', timezone: 'America/Montevideo' },
    { country: 'Argentina', code: 'AR', timezone: 'America/Argentina/Buenos_Aires' },
    { country: 'Brazil', code: 'BR', timezone: 'America/Sao_Paulo' }
  ],
  'america_sao_paulo': [
    { country: 'Brazil', code: 'BR', timezone: 'America/Sao_Paulo' },
    { country: 'Argentina', code: 'AR', timezone: 'America/Argentina/Buenos_Aires' },
    { country: 'Uruguay', code: 'UY', timezone: 'America/Montevideo' }
  ],
  
  // UTC-4 (Bolívia, Chile, Paraguai)
  'america_la_paz': [
    { country: 'Bolivia', code: 'BO', timezone: 'America/La_Paz' },
    { country: 'Paraguay', code: 'PY', timezone: 'America/Asuncion' }
  ],
  'america_santiago': [
    { country: 'Chile', code: 'CL', timezone: 'America/Santiago' }
  ],
  'america_asuncion': [
    { country: 'Paraguay', code: 'PY', timezone: 'America/Asuncion' },
    { country: 'Bolivia', code: 'BO', timezone: 'America/La_Paz' }
  ],
  
  // UTC-5 (Peru, Equador, Colômbia)
  'america_lima': [
    { country: 'Peru', code: 'PE', timezone: 'America/Lima' },
    { country: 'Ecuador', code: 'EC', timezone: 'America/Guayaquil' },
    { country: 'Colombia', code: 'CO', timezone: 'America/Bogota' }
  ],
  'america_guayaquil': [
    { country: 'Ecuador', code: 'EC', timezone: 'America/Guayaquil' },
    { country: 'Peru', code: 'PE', timezone: 'America/Lima' },
    { country: 'Colombia', code: 'CO', timezone: 'America/Bogota' }
  ],
  'america_bogota': [
    { country: 'Colombia', code: 'CO', timezone: 'America/Bogota' },
    { country: 'Peru', code: 'PE', timezone: 'America/Lima' },
    { country: 'Ecuador', code: 'EC', timezone: 'America/Guayaquil' }
  ],
  
  // UTC-4:30 (Venezuela)
  'america_caracas': [
    { country: 'Venezuela', code: 'VE', timezone: 'America/Caracas' }
  ],
  
  // UTC-3 (Falkland/Malvinas)
  'atlantic_stanley': [
    { country: 'Falkland Islands', code: 'FK', timezone: 'Atlantic/Stanley' },
    { country: 'Argentina', code: 'AR', timezone: 'America/Argentina/Buenos_Aires' }
  ],
  
  // UTC-4 (Guiana)
  'america_guyana': [
    { country: 'Guyana', code: 'GY', timezone: 'America/Guyana' }
  ],
  
  // UTC-3 (Guiana Francesa, Parte do Brasil)
  'america_cayenne': [
    { country: 'French Guiana', code: 'GF', timezone: 'America/Cayenne' },
    { country: 'Brazil', code: 'BR', timezone: 'America/Sao_Paulo' }
  ],
  
  // UTC-3 (Suriname)
  'america_paramaribo': [
    { country: 'Suriname', code: 'SR', timezone: 'America/Paramaribo' }
  ]
};

const TimezoneClock = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { theme, toggleTheme, systemPreference } = useTheme();
  const [timezoneData, setTimezoneData] = useState<TimezoneData | null>(null);
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  
  // Função para restaurar a preferência do sistema
  const restoreSystemPreference = () => {
    if (systemPreference && theme !== systemPreference) {
      toggleTheme();
    }
  };
  
  // Função para converter ID da URL para timezone real
  const getTimezoneFromId = (urlId: string): string => {
    return urlId.replace(/_/g, '/');
  };
  
  // Inicializar os dados do timezone a partir do ID da URL ou sessionStorage
  useEffect(() => {
    if (!id) return;
    
    // Primeiro, tentar obter do sessionStorage
    const storedData = sessionStorage.getItem('timezone_data');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setTimezoneData(parsedData);
        return;
      } catch (e) {
        console.error('Error parsing sessionStorage data:', e);
      }
    }
    
    // Se não houver dados no sessionStorage ou houver erro, usar o ID da URL
    const normalizedId = id.toLowerCase();
    
    // Verificar se temos um mapeamento predefinido para este ID
    if (TIMEZONE_MAPPINGS[normalizedId]) {
      setTimezoneData({
        timezone: TIMEZONE_MAPPINGS[normalizedId][0].timezone,
        countries: TIMEZONE_MAPPINGS[normalizedId]
      });
      return;
    }
    
    // Caso não tenha mapeamento predefinido, criar um com base no ID
    const timezone = getTimezoneFromId(normalizedId);
    // Extrair nome do país do timezone (simplificado)
    const countryName = timezone.split('/').pop()?.replace(/_/g, ' ') || '';
    
    setTimezoneData({
      timezone,
      countries: [
        { country: countryName, code: countryName.substring(0, 2).toUpperCase(), timezone }
      ]
    });
    
  }, [id]);
  
  // Atualizar o relógio
  useEffect(() => {
    if (!timezoneData) return;
    
    const updateClock = () => {
      const now = new Date();
      
      const timeOptions: Intl.DateTimeFormatOptions = {
        timeZone: timezoneData.timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      
      const timeFormat = getTranslation('time_format', language) as string;
      const timeString = new Intl.DateTimeFormat(timeFormat, timeOptions).format(now);
      
      // Get localized date string using our custom function
      const dateInTimezone = new Date(now.toLocaleString('en-US', { timeZone: timezoneData.timezone }));
      const localizedDate = formatLocalizedDate(dateInTimezone, language);
      
      setTime(timeString);
      setDate(localizedDate);
    };
    
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    
    return () => clearInterval(intervalId);
  }, [timezoneData, language]);
  
  // Se não houver dados, mostrar mensagem de carregamento
  if (!timezoneData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#191919] text-neutral-700 dark:text-neutral-300">
        Carregando...
      </div>
    );
  }
  
  const [hours, minutes, seconds] = time.split(':') || ['', '', ''];
  
  return (
    <div className="relative w-full h-screen overflow-hidden bg-white dark:bg-[#191919]">
      {/* Botão para voltar à página inicial */}
      <Link
        to="/"
        className="absolute top-4 left-4 p-2 rounded-full bg-white dark:bg-[rgba(50,50,50,0.5)] text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-[rgba(70,70,70,0.7)] transition-colors z-10"
        aria-label="Voltar para a página inicial"
        title="Voltar para a página inicial"
      >
        <ArrowLeft size={20} />
      </Link>
      
      {/* Botão para restaurar preferência do sistema (apenas mostrado se diferente do tema atual) */}
      {systemPreference && theme !== systemPreference && (
        <button 
          onClick={restoreSystemPreference} 
          className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-[rgba(50,50,50,0.5)] text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-[rgba(70,70,70,0.7)] transition-colors z-10"
          aria-label="Use system preference"
          title="Use system preference"
        >
          <Monitor size={20} />
        </button>
      )}
      
      <div className="min-h-screen flex items-center justify-center relative p-4 sm:p-6 md:p-8">
        <div className="flex flex-col items-center max-w-full overflow-hidden">
          <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[13.5rem] font-bold tracking-tight">
            <span className="text-neutral-700 dark:text-neutral-300">{hours}</span>
            <span className="separator px-1 sm:px-2 text-neutral-600 dark:text-neutral-500">:</span>
            <span className="text-neutral-600 dark:text-neutral-400">{minutes}</span>
            <span className="separator px-1 sm:px-2 text-neutral-600 dark:text-neutral-500">:</span>
            <span className="text-neutral-500 dark:text-neutral-500">{seconds}</span>
          </div>
          
          {/* Data */}
          <p className="text-xl sm:text-xl md:text-2xl lg:text-3xl mt-4 sm:mt-6 md:mt-8 text-neutral-500 dark:text-neutral-400 font-medium">
            {date}
          </p>
          
          {/* Título para países que compartilham este fuso horário */}
          <div className="mt-8 mb-3 flex items-center justify-center text-neutral-600 dark:text-neutral-400">
            <Globe size={18} className="mr-2" />
            <span className="text-sm sm:text-base font-medium">
              {getLocalizedHomeText("Countries in this timezone", language)}
            </span>
          </div>
          
          {/* Países logo abaixo da data */}
          <div className="flex flex-wrap gap-2 justify-center max-w-md">
            {timezoneData.countries.map((country) => (
              <div 
                key={country.country} 
                className="px-3 py-1 rounded-full bg-white dark:bg-[rgba(50,50,50,0.5)] text-neutral-800 dark:text-neutral-200 text-sm font-medium flex items-center shadow-sm hover:bg-neutral-100 dark:hover:bg-[rgba(70,70,70,0.7)] transition-colors"
                title={getLocalizedCountry(country.country, language)}
              >
                <MapPin size={14} className="mr-1 text-neutral-500 dark:text-neutral-400" />
                <span>{country.code}</span>
                <span className="hidden sm:inline ml-1">- {getLocalizedCountry(country.country, language)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimezoneClock; 
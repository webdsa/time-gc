import Clock from '../components/Clock';
import { useTheme } from '../context/ThemeContext';
import { Monitor } from 'lucide-react';

const StLouisClock = () => {
  // Use o hook useTheme para detectar o tema atual e a preferência do sistema
  const { theme, toggleTheme, systemPreference } = useTheme();
  
  // Função para restaurar a preferência do sistema
  const restoreSystemPreference = () => {
    if (systemPreference && theme !== systemPreference) {
      toggleTheme();
    }
  };
  
  return (
    <div className="relative w-full h-screen overflow-hidden bg-white dark:bg-[#191919]">
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
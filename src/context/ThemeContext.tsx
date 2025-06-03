import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  systemPreference: Theme | null;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [systemPreference, setSystemPreference] = useState<Theme | null>(null);

  // Detectar preferência do sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemPreferenceChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const newSystemPreference = e.matches ? 'dark' : 'light';
      setSystemPreference(newSystemPreference);
      
      // Se não houver tema salvo no localStorage, use a preferência do sistema
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (!savedTheme) {
        setTheme(newSystemPreference);
      }
    };
    
    // Inicialização
    handleSystemPreferenceChange(mediaQuery);
    
    // Monitorar mudanças na preferência do sistema
    const mediaQueryListener = (e: MediaQueryListEvent) => handleSystemPreferenceChange(e);
    mediaQuery.addEventListener('change', mediaQueryListener);
    
    return () => mediaQuery.removeEventListener('change', mediaQueryListener);
  }, []);

  // Carregar tema salvo do localStorage ao iniciar
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Aplicar tema ao documento e salvar no localStorage
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, systemPreference }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 
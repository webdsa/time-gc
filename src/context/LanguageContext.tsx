import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { getBrowserLanguage } from '../i18n/translations';

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>('en');
  
  useEffect(() => {
    // Get browser language on initial load
    setLanguage(getBrowserLanguage());
  }, []);
  
  // We keep the setLanguage function in the context to maintain API compatibility,
  // but it will be a no-op since we only want to use browser language detection
  const handleSetLanguage = (newLanguage: string) => {
    // Only set language if it's coming from the browser detection
    if (newLanguage === getBrowserLanguage()) {
      setLanguage(newLanguage);
    }
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 
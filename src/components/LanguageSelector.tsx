import React, { useEffect } from 'react';
import { getBrowserLanguage } from '../i18n/translations';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange
}) => {
  // Use browser language on mount
  useEffect(() => {
    const browserLang = getBrowserLanguage();
    if (browserLang !== currentLanguage) {
      onLanguageChange(browserLang);
    }
  }, [currentLanguage, onLanguageChange]);
  
  // Render nothing as we now only use browser detection
  return null;
};

export default LanguageSelector; 
type TranslationKey = 'date_format' | 'time_format' | 'months' | 'weekdays';

interface Translations {
  [key: string]: {
    [key in TranslationKey]: string | string[];
  };
}

export const translations: Translations = {
  en: { // English
    date_format: 'en-US',
    time_format: 'en-US',
    months: [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    weekdays: [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 
      'Thursday', 'Friday', 'Saturday'
    ]
  },
  pt: { // Portuguese
    date_format: 'pt-BR',
    time_format: 'pt-BR',
    months: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    weekdays: [
      'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 
      'Quinta-feira', 'Sexta-feira', 'Sábado'
    ]
  },
  es: { // Spanish
    date_format: 'es-ES',
    time_format: 'es-ES',
    months: [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    weekdays: [
      'Domingo', 'Lunes', 'Martes', 'Miércoles', 
      'Jueves', 'Viernes', 'Sábado'
    ]
  },
};

export const cityNames: { [key: string]: { [key: string]: string } } = {
  "Brasília": {
    en: "BRASÍLIA",
    pt: "BRASÍLIA",
    es: "BRASILIA"
  },
  "St. Louis": {
    en: "ST. LOUIS",
    pt: "ST. LOUIS",
    es: "ST. LOUIS"
  }
};

// Translations for date-related text
export const dateLabels: { [key: string]: { [key: string]: string } } = {
  "Today": {
    en: "Today",
    pt: "Hoje",
    es: "Hoy"
  },
  "Current Date": {
    en: "Current Date",
    pt: "Data Atual",
    es: "Fecha Actual"
  }
};

// Translations for Home page
export const homeTranslations: { [key: string]: { [key: string]: string } } = {
  "Multi-Timezone Clock": {
    en: "Multi-Timezone Clock",
    pt: "Relógio Multi-Fuso Horário",
    es: "Reloj Multi-Zona Horaria"
  },
  "View Fullscreen": {
    en: "View Fullscreen",
    pt: "Ver em Tela Cheia",
    es: "Ver en Pantalla Completa"
  },
  "South American Time Zones": {
    en: "South American Time Zones",
    pt: "Fusos Horários da América do Sul",
    es: "Zonas Horarias de América del Sur"
  },
  "Click \"View Fullscreen\" to see each clock in a distraction-free interface.": {
    en: "Click \"View Fullscreen\" to see each clock in a distraction-free interface.",
    pt: "Clique em \"Ver em Tela Cheia\" para ver cada relógio em uma interface sem distrações.",
    es: "Haga clic en \"Ver en Pantalla Completa\" para ver cada reloj en una interfaz sin distracciones."
  },
  "Click to view fullscreen": {
    en: "Click to view fullscreen",
    pt: "Clique para ver em tela cheia",
    es: "Clic para ver en pantalla completa"
  },
  "Countries in this timezone": {
    en: "Countries in this timezone",
    pt: "Países neste fuso horário",
    es: "Países en esta zona horaria"
  }
};

// Country translations
export const countryTranslations: { [key: string]: { [key: string]: string } } = {
  "Argentina": {
    en: "Argentina",
    pt: "Argentina",
    es: "Argentina"
  },
  "Bolivia": {
    en: "Bolivia",
    pt: "Bolívia",
    es: "Bolivia"
  },
  "Brazil": {
    en: "Brazil",
    pt: "Brasil",
    es: "Brasil"
  },
  "Chile": {
    en: "Chile",
    pt: "Chile",
    es: "Chile"
  },
  "Colombia": {
    en: "Colombia",
    pt: "Colômbia",
    es: "Colombia"
  },
  "Ecuador": {
    en: "Ecuador",
    pt: "Equador",
    es: "Ecuador"
  },
  "Falkland Islands": {
    en: "Falkland Islands",
    pt: "Ilhas Malvinas",
    es: "Islas Malvinas"
  },
  "French Guiana": {
    en: "French Guiana",
    pt: "Guiana Francesa",
    es: "Guayana Francesa"
  },
  "Guyana": {
    en: "Guyana",
    pt: "Guiana",
    es: "Guyana"
  },
  "Paraguay": {
    en: "Paraguay",
    pt: "Paraguai",
    es: "Paraguay"
  },
  "Peru": {
    en: "Peru",
    pt: "Peru",
    es: "Perú"
  },
  "Suriname": {
    en: "Suriname",
    pt: "Suriname",
    es: "Surinam"
  },
  "Uruguay": {
    en: "Uruguay",
    pt: "Uruguai",
    es: "Uruguay"
  },
  "Venezuela": {
    en: "Venezuela",
    pt: "Venezuela",
    es: "Venezuela"
  }
};

export const getBrowserLanguage = (): string => {
  if (typeof navigator === 'undefined') return 'en';
  const language = navigator.language.split('-')[0];
  return translations[language] ? language : 'en'; // Default to English if not supported
};

export const getTranslation = (key: TranslationKey, lang?: string): string | string[] => {
  const language = lang || getBrowserLanguage();
  return translations[language][key];
};

export const getLocalizedCityName = (cityName: string, lang?: string): string => {
  const language = lang || getBrowserLanguage();
  return cityNames[cityName]?.[language] || cityName.toUpperCase();
};

export const getLocalizedLabel = (label: string, lang?: string): string => {
  const language = lang || getBrowserLanguage();
  return dateLabels[label]?.[language] || label;
};

// Function to format a date using custom localization
export const formatLocalizedDate = (date: Date, lang?: string): string => {
  const language = lang || getBrowserLanguage();
  const weekdays = translations[language].weekdays as string[];
  const months = translations[language].months as string[];
  
  const weekday = weekdays[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  if (language === 'en') {
    return `${weekday}, ${month} ${day}, ${year}`;
  } else if (language === 'pt') {
    return `${weekday}, ${day} de ${month} de ${year}`;
  } else if (language === 'es') {
    return `${weekday}, ${day} de ${month} de ${year}`;
  }
  
  return date.toLocaleDateString(translations[language].date_format as string);
};

export const getLocalizedHomeText = (key: string, lang?: string): string => {
  const language = lang || getBrowserLanguage();
  return homeTranslations[key]?.[language] || key;
};

export const getLocalizedCountry = (country: string, lang?: string): string => {
  const language = lang || getBrowserLanguage();
  return countryTranslations[country]?.[language] || country;
}; 
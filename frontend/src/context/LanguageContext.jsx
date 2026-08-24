import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { i18nService } from '../services/index';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(localStorage.getItem('sih_language') || 'en');
  const [translations, setTranslations] = useState({});
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load available languages
  useEffect(() => {
    i18nService.getLanguages()
      .then(res => setLanguages(res.data || []))
      .catch(() => setLanguages([{ code: 'en', name: 'English', native_name: 'English' }]));
  }, []);

  // Load translations when language changes
  useEffect(() => {
    setLoading(true);
    i18nService.getTranslations(language)
      .then(res => {
        setTranslations(res.data || {});
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [language]);

  const setLanguage = useCallback((lang) => {
    localStorage.setItem('sih_language', lang);
    setLanguageState(lang);
  }, []);

  // Translation function
  const t = useCallback((key, fallback) => {
    return translations[key] || fallback || key;
  }, [translations]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages, loading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

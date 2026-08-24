import { Language, Translation } from '../models/index.js';

// Cache translations in memory for performance
const translationCache = new Map();

export async function getLanguages() {
  return await Language.findAll({
    where: { is_active: true },
    order: [['name', 'ASC']],
  });
}

export async function getTranslations(languageCode) {
  // Check cache
  if (translationCache.has(languageCode)) {
    return translationCache.get(languageCode);
  }

  const rows = await Translation.findAll({
    where: { language_code: languageCode },
  });

  const translations = {};
  rows.forEach(row => {
    translations[row.translation_key] = row.translation_value;
  });

  // Cache for 10 minutes
  translationCache.set(languageCode, translations);
  setTimeout(() => translationCache.delete(languageCode), 10 * 60 * 1000);

  return translations;
}

export function clearTranslationCache() {
  translationCache.clear();
}

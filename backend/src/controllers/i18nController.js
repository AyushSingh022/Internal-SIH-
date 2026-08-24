import * as i18nService from '../i18n/translator.js';
import { successResponse, errorResponse } from '../utils/response.js';

export async function getLanguages(req, res) {
  try {
    const languages = await i18nService.getLanguages();
    return successResponse(res, languages);
  } catch (err) {
    return errorResponse(res, 'Failed to fetch languages', 500);
  }
}

export async function getTranslations(req, res) {
  try {
    const { locale } = req.params;
    if (!locale) return errorResponse(res, 'Locale is required', 400);
    const translations = await i18nService.getTranslations(locale);
    return successResponse(res, translations);
  } catch (err) {
    return errorResponse(res, 'Failed to fetch translations', 500);
  }
}

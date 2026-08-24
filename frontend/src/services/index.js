import api from './api';

export const authService = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const locationService = {
  getStates: () => api.get('/locations/states'),
  getDistricts: (stateId) => api.get(`/locations/districts?stateId=${stateId}`),
  getTehsils: (districtId) => api.get(`/locations/tehsils?districtId=${districtId}`),
  getBlocks: (districtId) => api.get(`/locations/blocks?districtId=${districtId}`),
  getVillages: (params) => api.get('/locations/villages', { params }),
};

export const businessService = {
  getCategories: () => api.get('/businesses/categories'),
  getNearby: (params) => api.get('/businesses/nearby', { params }),
  getCompetitors: (params) => api.get('/businesses/competitors', { params }),
};

export const schemeService = {
  getAll: (params) => api.get('/schemes', { params }),
  getById: (id) => api.get(`/schemes/${id}`),
  getEligible: (params) => api.get('/schemes/eligible', { params }),
  compare: (ids) => api.get(`/schemes/compare?ids=${ids.join(',')}`),
};

export const financialService = {
  calculate: (data) => api.post('/financial/calculate', data),
  repayment: (data) => api.post('/financial/repayment', data),
};

export const analysisService = {
  generate: (data) => api.post('/analysis/generate', data),
  getReports: () => api.get('/reports'),
  getReport: (id) => api.get(`/reports/${id}`),
  downloadPDF: (id) => api.get(`/reports/${id}/pdf`, { responseType: 'blob' }),
};

export const i18nService = {
  getLanguages: () => api.get('/i18n/languages'),
  getTranslations: (locale) => api.get(`/i18n/${locale}`),
};

import api from './api';

export const authService = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const INDIAN_STATES_FALLBACK = [
  { id: 1, name: 'Andaman and Nicobar Islands', name_local: 'अंडमान और निकोबार द्वीप समूह' },
  { id: 2, name: 'Andhra Pradesh', name_local: 'ఆంధ్ర ప్రదేశ్' },
  { id: 3, name: 'Arunachal Pradesh', name_local: 'अरुणाचल प्रदेश' },
  { id: 4, name: 'Assam', name_local: 'অসম' },
  { id: 5, name: 'Bihar', name_local: 'बिहार' },
  { id: 6, name: 'Chandigarh', name_local: 'चंडीगढ़' },
  { id: 7, name: 'Chhattisgarh', name_local: 'छत्तीसगढ़' },
  { id: 8, name: 'Dadra and Nagar Haveli and Daman and Diu', name_local: 'दादरा और नगर हवेली और दमन और दीव' },
  { id: 9, name: 'Delhi', name_local: 'दिल्ली' },
  { id: 10, name: 'Goa', name_local: 'गोवा' },
  { id: 11, name: 'Gujarat', name_local: 'ગુજરાત' },
  { id: 12, name: 'Haryana', name_local: 'हरियाणा' },
  { id: 13, name: 'Himachal Pradesh', name_local: 'हिमाचल प्रदेश' },
  { id: 14, name: 'Jammu and Kashmir', name_local: 'जम्मू और कश्मीर' },
  { id: 15, name: 'Jharkhand', name_local: 'झारखण्ड' },
  { id: 16, name: 'Karnataka', name_local: 'ಕರ್ನಾಟಕ' },
  { id: 17, name: 'Kerala', name_local: 'കേരളം' },
  { id: 18, name: 'Ladakh', name_local: 'लद्दाख' },
  { id: 19, name: 'Lakshadweep', name_local: 'लक्षद्वीप' },
  { id: 20, name: 'Madhya Pradesh', name_local: 'मध्य प्रदेश' },
  { id: 21, name: 'Maharashtra', name_local: 'महाराष्ट्र' },
  { id: 22, name: 'Manipur', name_local: 'मणिपुर' },
  { id: 23, name: 'Meghalaya', name_local: 'मेघालय' },
  { id: 24, name: 'Mizoram', name_local: 'मिज़ोरम' },
  { id: 25, name: 'Nagaland', name_local: 'नागालैंड' },
  { id: 26, name: 'Odisha', name_local: 'ଓଡ଼ିଶା' },
  { id: 27, name: 'Puducherry', name_local: 'पुदुचेरी' },
  { id: 28, name: 'Punjab', name_local: 'ਪੰਜਾਬ' },
  { id: 29, name: 'Rajasthan', name_local: 'राजस्थान' },
  { id: 30, name: 'Sikkim', name_local: 'सिक्किम' },
  { id: 31, name: 'Tamil Nadu', name_local: 'தமிழ்நாடு' },
  { id: 32, name: 'Telangana', name_local: 'తెలంగాణ' },
  { id: 33, name: 'Tripura', name_local: 'त्रिपुरा' },
  { id: 34, name: 'Uttar Pradesh', name_local: 'उत्तर प्रदेश' },
  { id: 35, name: 'Uttarakhand', name_local: 'उत्तराखंड' },
  { id: 36, name: 'West Bengal', name_local: 'पश्चिमबंग' },
];

export const locationService = {
  getStates: () =>
    api.get('/locations/states').catch(() => ({ data: INDIAN_STATES_FALLBACK })),
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

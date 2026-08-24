import * as businessService from '../services/businessService.js';
import { successResponse, errorResponse } from '../utils/response.js';

export async function getCategories(req, res) {
  try {
    const categories = await businessService.getCategories();
    return successResponse(res, categories);
  } catch (err) {
    return errorResponse(res, 'Failed to fetch categories', 500);
  }
}

export async function getNearbyBusinesses(req, res) {
  try {
    const { lat, lng, radius, categoryId } = req.query;
    if (!lat || !lng) return errorResponse(res, 'lat and lng are required', 400);
    const radiusKm = parseInt(radius) || 10;
    const businesses = await businessService.getNearbyBusinesses(lat, lng, radiusKm, categoryId || null);
    return successResponse(res, businesses);
  } catch (err) {
    return errorResponse(res, 'Failed to fetch nearby businesses', 500);
  }
}

export async function getCompetitorAnalysis(req, res) {
  try {
    const { lat, lng, radius, categoryId } = req.query;
    if (!lat || !lng) return errorResponse(res, 'lat and lng are required', 400);
    const analysis = await businessService.getCompetitorAnalysis(
      parseFloat(lat), parseFloat(lng), parseInt(radius) || 10, categoryId
    );
    return successResponse(res, analysis);
  } catch (err) {
    return errorResponse(res, 'Failed to analyze competitors', 500);
  }
}

import * as schemeService from '../services/schemeService.js';
import { successResponse, errorResponse } from '../utils/response.js';

export async function getAllSchemes(req, res) {
  try {
    const schemes = await schemeService.getAllSchemes(req.query);
    return successResponse(res, schemes);
  } catch (err) {
    return errorResponse(res, 'Failed to fetch schemes', 500);
  }
}

export async function getSchemeById(req, res) {
  try {
    const scheme = await schemeService.getSchemeById(req.params.id);
    if (!scheme) return errorResponse(res, 'Scheme not found', 404);
    return successResponse(res, scheme);
  } catch (err) {
    return errorResponse(res, 'Failed to fetch scheme', 500);
  }
}

export async function getEligibleSchemes(req, res) {
  try {
    const { available_capital, category_id, state, is_new_business } = req.query;
    if (!available_capital) return errorResponse(res, 'available_capital is required', 400);
    const schemes = await schemeService.getEligibleSchemes({
      availableCapital: parseFloat(available_capital),
      categoryId: category_id,
      state,
      isNewBusiness: is_new_business !== 'false',
    });
    return successResponse(res, schemes);
  } catch (err) {
    return errorResponse(res, 'Failed to find eligible schemes', 500);
  }
}

export async function compareSchemes(req, res) {
  try {
    const { ids } = req.query;
    if (!ids) return errorResponse(res, 'Scheme ids are required', 400);
    const schemeIds = ids.split(',').map(Number);
    const comparison = await schemeService.compareSchemes(schemeIds);
    return successResponse(res, comparison);
  } catch (err) {
    return errorResponse(res, 'Failed to compare schemes', 500);
  }
}

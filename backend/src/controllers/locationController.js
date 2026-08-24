import * as locationService from '../services/locationService.js';
import { successResponse, errorResponse } from '../utils/response.js';

export async function getStates(req, res) {
  try {
    const states = await locationService.getStates();
    return successResponse(res, states);
  } catch (err) {
    return errorResponse(res, 'Failed to fetch states', 500);
  }
}

export async function getDistricts(req, res) {
  try {
    const { stateId } = req.query;
    if (!stateId) return errorResponse(res, 'stateId is required', 400);
    const districts = await locationService.getDistricts(stateId);
    return successResponse(res, districts);
  } catch (err) {
    return errorResponse(res, 'Failed to fetch districts', 500);
  }
}

export async function getTehsils(req, res) {
  try {
    const { districtId } = req.query;
    if (!districtId) return errorResponse(res, 'districtId is required', 400);
    const tehsils = await locationService.getTehsils(districtId);
    return successResponse(res, tehsils);
  } catch (err) {
    return errorResponse(res, 'Failed to fetch tehsils', 500);
  }
}

export async function getBlocks(req, res) {
  try {
    const { districtId } = req.query;
    if (!districtId) return errorResponse(res, 'districtId is required', 400);
    const blocks = await locationService.getBlocks(districtId);
    return successResponse(res, blocks);
  } catch (err) {
    return errorResponse(res, 'Failed to fetch blocks', 500);
  }
}

export async function getVillages(req, res) {
  try {
    const villages = await locationService.getVillages(req.query);
    return successResponse(res, villages);
  } catch (err) {
    return errorResponse(res, 'Failed to fetch villages', 500);
  }
}

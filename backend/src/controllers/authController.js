import { validationResult } from 'express-validator';
import * as authService from '../services/authService.js';
import { successResponse, errorResponse } from '../utils/response.js';

export async function signup(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return errorResponse(res, 'Validation failed', 400, errors.array());

    const result = await authService.signupUser(req.body);
    return successResponse(res, result, 'Account created successfully', 201);
  } catch (err) {
    return errorResponse(res, err.message || 'Signup failed', err.status || 500);
  }
}

export async function login(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return errorResponse(res, 'Validation failed', 400, errors.array());

    const result = await authService.loginUser(req.body);
    return successResponse(res, result, 'Login successful');
  } catch (err) {
    return errorResponse(res, err.message || 'Login failed', err.status || 500);
  }
}

export async function getMe(req, res) {
  try {
    const user = await authService.getUserProfile(req.user.id);
    return successResponse(res, user);
  } catch (err) {
    return errorResponse(res, err.message || 'Failed to get profile', err.status || 500);
  }
}

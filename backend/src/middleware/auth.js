import jwt from 'jsonwebtoken';
import env from '../config/environment.js';
import { errorResponse } from '../utils/response.js';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return errorResponse(res, 'Authentication required', 401);
  }

  try {
    const decoded = jwt.verify(token, env.jwt.secret);
    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(res, 'Invalid or expired token', 401);
  }
}

export function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, env.jwt.secret);
      req.user = decoded;
    } catch {
      // Token invalid, but optional — continue without auth
    }
  }
  next();
}

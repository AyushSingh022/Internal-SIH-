import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../config/environment.js';
import { User } from '../models/index.js';

export async function signupUser({ full_name, email, mobile, password, preferred_language, state_id, district_id }) {
  // Check for duplicate
  const existing = await User.findOne({ where: { email } });
  if (existing) {
    throw { status: 409, message: 'An account with this email already exists' };
  }

  const password_hash = await bcrypt.hash(password, 12);
  const user = await User.create({
    full_name,
    email,
    mobile: mobile || null,
    password_hash,
    preferred_language: preferred_language || 'en',
    state_id: state_id || null,
    district_id: district_id || null,
  });

  const token = generateToken(user);
  return {
    token,
    user: sanitizeUser(user),
  };
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw { status: 401, message: 'Invalid email or password' };
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw { status: 401, message: 'Invalid email or password' };
  }

  const token = generateToken(user);
  return {
    token,
    user: sanitizeUser(user),
  };
}

export async function getUserProfile(userId) {
  const user = await User.findByPk(userId);
  if (!user) {
    throw { status: 404, message: 'User not found' };
  }
  return sanitizeUser(user);
}

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    env.jwt.secret,
    { expiresIn: env.jwt.expiresIn }
  );
}

function sanitizeUser(user) {
  return {
    id: user.id,
    full_name: user.full_name,
    email: user.email,
    mobile: user.mobile,
    preferred_language: user.preferred_language,
    state_id: user.state_id,
    district_id: user.district_id,
  };
}

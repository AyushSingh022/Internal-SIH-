import { Router } from 'express';
import { signup, login, getMe } from '../controllers/authController.js';
import { signupValidator, loginValidator } from '../validators/index.js';
import { authenticateToken } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/signup', authLimiter, signupValidator, signup);
router.post('/login', authLimiter, loginValidator, login);
router.get('/me', authenticateToken, getMe);

export default router;

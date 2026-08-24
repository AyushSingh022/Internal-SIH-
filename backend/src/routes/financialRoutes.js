import { Router } from 'express';
import { calculate, repayment } from '../controllers/financialController.js';
import { financialCalculateValidator, repaymentValidator } from '../validators/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.post('/calculate', authenticateToken, financialCalculateValidator, calculate);
router.post('/repayment', authenticateToken, repaymentValidator, repayment);

export default router;

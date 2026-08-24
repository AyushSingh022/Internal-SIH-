import { Router } from 'express';
import { generateAnalysis, getReports, getReportById, downloadReportPDF } from '../controllers/analysisController.js';
import { analysisValidator } from '../validators/index.js';
import { authenticateToken } from '../middleware/auth.js';
import { aiLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/generate', authenticateToken, aiLimiter, analysisValidator, generateAnalysis);
router.get('/', authenticateToken, getReports);
router.get('/:id', authenticateToken, getReportById);
router.get('/:id/pdf', authenticateToken, downloadReportPDF);

export default router;

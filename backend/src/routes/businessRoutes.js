import { Router } from 'express';
import { getCategories, getNearbyBusinesses, getCompetitorAnalysis } from '../controllers/businessController.js';

const router = Router();

router.get('/categories', getCategories);
router.get('/nearby', getNearbyBusinesses);
router.get('/competitors', getCompetitorAnalysis);

export default router;

import { Router } from 'express';
import { getAllSchemes, getSchemeById, getEligibleSchemes, compareSchemes } from '../controllers/schemeController.js';

const router = Router();

router.get('/', getAllSchemes);
router.get('/eligible', getEligibleSchemes);
router.get('/compare', compareSchemes);
router.get('/:id', getSchemeById);

export default router;

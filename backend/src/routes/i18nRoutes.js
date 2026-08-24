import { Router } from 'express';
import { getLanguages, getTranslations } from '../controllers/i18nController.js';

const router = Router();

router.get('/languages', getLanguages);
router.get('/:locale', getTranslations);

export default router;

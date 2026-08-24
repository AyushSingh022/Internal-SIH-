import { Router } from 'express';
import { getStates, getDistricts, getTehsils, getBlocks, getVillages } from '../controllers/locationController.js';

const router = Router();

router.get('/states', getStates);
router.get('/districts', getDistricts);
router.get('/tehsils', getTehsils);
router.get('/blocks', getBlocks);
router.get('/villages', getVillages);

export default router;

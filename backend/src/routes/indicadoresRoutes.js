import { Router } from 'express';
import * as indicadoresController from '../controllers/indicadoresController.js';

const router = Router();

// GET /api/indicadores
router.get('/', indicadoresController.getIndicadoresEconomicos);

export default router;
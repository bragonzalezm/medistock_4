import { Router } from 'express';
import * as ingresoController from '../controllers/ingresoController.js';

const router = Router();

// POST /api/ingresos
router.post('/', ingresoController.postIngreso);

export default router;
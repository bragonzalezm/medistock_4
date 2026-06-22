import { Router } from 'express';
import * as ventaController from '../controllers/ventaController.js';

const router = Router();

router.post('/', ventaController.postVenta);

export default router;
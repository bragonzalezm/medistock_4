import { Router } from 'express';
import * as seguimientoController from '../controllers/seguimientoController.js';

const router = Router();

router.post('/', seguimientoController.postSeguimiento);

export default router;
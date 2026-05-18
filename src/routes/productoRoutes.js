import { Router } from 'express';
import { getProductos } from '../controllers/productoController.js';
import { postProductos } from '../controllers/productoController.js';

const router = Router();

router.get('/', getProductos);
router.post('/', postProductos);

export default router;
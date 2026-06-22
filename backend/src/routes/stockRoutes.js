import { Router } from 'express';
import * as stockController from '../controllers/stockController.js';

const router = Router();

// POST /api/stock -> Para cuando el producto llega a la bodega por primera vez
router.post('/', stockController.postStockInicial);

// PUT /api/stock/actualizar -> Para sumar o restar unidades existentes
router.put('/actualizar', stockController.putActualizarStock);

// GET /api/stock/producto/5 -> Para saber en qué bodegas está el producto 5
router.get('/producto/:idProducto', stockController.getStockPorProducto);

export default router;
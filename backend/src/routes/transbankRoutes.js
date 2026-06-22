import { Router } from 'express';
import * as pagoController from '../controllers/pagoController.js';

const router = Router();

// Ruta POST para pedirle el link de pago a Transbank
router.post('/iniciar', pagoController.postIniciarPago);

// Ruta GET para recibir al usuario cuando vuelve de Webpay
router.get('/confirmar', pagoController.getConfirmarPago);

export default router;
import { Router } from 'express';
import * as usuarioController from '../controllers/usuarioController.js';

const router = Router();

router.post('/registro', usuarioController.postRegistro);
router.post('/login', usuarioController.postLogin);

export default router;
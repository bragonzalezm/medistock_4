import { Router } from 'express';
import * as usuarioController from '../controllers/usuarioController.js';

const router = Router();

//router.post('/registro', usuarioController.postRegistro);
router.post('/login', usuarioController.postLogin);
router.post('/registro', usuarioController.registrarUsuario);

export default router;
import { Router } from 'express';
import * as parametrosController from '../controllers/parametrosController.js';

const router = Router();

router.get('/regiones', parametrosController.getRegiones);
router.get('/comunas', parametrosController.getComunas);
router.get('/roles-usuario', parametrosController.getRolUsuarios);
router.get('/estados-seguimiento', parametrosController.getEstadoSeguimientos);
router.get('/tipos-cliente', parametrosController.getTipoClientes);
router.get('/tipos-medicion', parametrosController.getTipoMedicion);
router.get('/categorias', parametrosController.getCategorias);
router.get('/tipos-documento', parametrosController.getTipoDocumentos);
router.get('/estados-pago', parametrosController.getEstadoPagos);
router.get('/tipos-despacho', parametrosController.getTipoDespachos);
router.get('/impuestos', parametrosController.getImpuestos);
router.get('/bodegas', parametrosController.getBodegas);


export default router;
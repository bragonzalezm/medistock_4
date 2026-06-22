import * as seguimientoService from '../services/seguimientoService.js';

export const postSeguimiento = async (req, res) => {
  try {
    const despachoRegistrado = await seguimientoService.generarDespacho(req.body);
    res.status(201).json({
      mensaje: 'Despacho generado exitosamente',
      seguimiento: despachoRegistrado
    });
  } catch (error) {
    res.status(400).json({ error: error.message || 'Error al generar el despacho' });
  }
};
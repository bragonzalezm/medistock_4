import * as ventaService from '../services/ventaService.js';

export const postVenta = async (req, res) => {
  try {
    const { venta, detalles } = req.body;
    const resultado = await ventaService.procesarVenta(venta, detalles);
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message || 'Error interno al procesar la venta' });
  }
};
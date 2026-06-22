import * as ventaRepository from '../repositories/ventaRepository.js';

export const procesarVenta = async (datosVenta, detalles) => {
  if (!detalles || detalles.length === 0) {
    throw new Error('No se puede procesar una venta con el carrito vacío.');
  }

  if (datosVenta.valor_total_bruto <= 0) {
    throw new Error('El valor total de la venta debe ser mayor a cero.');
  }

  // Si no se envía fecha desde el frontend, le asignamos la fecha y hora actual del servidor
  if (!datosVenta.fecha) {
    datosVenta.fecha = new Date().toISOString();
  }

  const idVenta = await ventaRepository.registrarVentaTransaccion(datosVenta, detalles);
  
  return { 
    id_venta: idVenta, 
    mensaje: 'Venta registrada con éxito. Stock descontado.' 
  };
};
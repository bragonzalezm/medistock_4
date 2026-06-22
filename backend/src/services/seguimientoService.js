import * as seguimientoRepository from '../repositories/seguimientoRepository.js';

export const generarDespacho = async (datosEnvio) => {
  if (!datosEnvio.id_venta || !datosEnvio.id_comuna_destino) {
    throw new Error('Faltan datos obligatorios para generar el despacho.');
  }

  // =========================================================
  // AQUÍ VA LA INTEGRACIÓN CON LA API DE BLUE EXPRESS
  // Ejemplo conceptual:
  // const respuestaBlue = await axios.post('https://api.blue.cl/v1/etiqueta', datosEnvio);
  // =========================================================

  // SIMULACIÓN DE LA RESPUESTA DE LA API:
  const numeroGenerado = 'BLX-' + Math.floor(Math.random() * 1000000);
  const urlPdfGenerado = `https://blueexpress.cl/etiquetas/${numeroGenerado}.pdf`;
  
  // Calculamos una fecha de entrega estimada (ej: 3 días más a partir de hoy)
  const fechaEstimada = new Date();
  fechaEstimada.setDate(fechaEstimada.getDate() + 3);

  // Armamos el objeto final para la base de datos
  const despachoFinal = {
    numero_seguimiento: numeroGenerado,
    url_etiqueta: urlPdfGenerado,
    costo_envio: datosEnvio.costo_envio || 3500, // Valor por defecto si no se especifica
    fecha_estimada_entrega: fechaEstimada.toISOString().split('T')[0], // Formato YYYY-MM-DD
    direccion_destino: datosEnvio.direccion_destino,
    id_comuna_destino: datosEnvio.id_comuna_destino,
    id_estado_seguimiento: 1, // ID 1 = 'En preparación' según tus datos
    id_venta: datosEnvio.id_venta,
    id_tipo_despacho: datosEnvio.id_tipo_despacho
  };

  return await seguimientoRepository.registrarSeguimiento(despachoFinal);
};
import pool from '../config/db.js';

export const registrarSeguimiento = async (datosDespacho) => {
  const consulta = `
    INSERT INTO seguimiento (
      numero_seguimiento, url_etiqueta, costo_envio, fecha_estimada_entrega, 
      direccion_destino, id_comuna_destino, id_estado_seguimiento, id_venta, id_tipo_despacho
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
  `;
  const valores = [
    datosDespacho.numero_seguimiento,
    datosDespacho.url_etiqueta,
    datosDespacho.costo_envio,
    datosDespacho.fecha_estimada_entrega,
    datosDespacho.direccion_destino,
    datosDespacho.id_comuna_destino,
    datosDespacho.id_estado_seguimiento,
    datosDespacho.id_venta,
    datosDespacho.id_tipo_despacho
  ];
  const result = await pool.query(consulta, valores);
  return result.rows[0];
};
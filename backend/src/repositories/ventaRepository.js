import pool from '../config/db.js';

export const registrarVentaTransaccion = async (datosVenta, detalles) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Insertar la Cabecera de la Venta
    const insertVenta = `
      INSERT INTO venta (fecha, valor_total_impuesto, valor_total_neto, valor_total_bruto, prioridad_urgencia_medica, id_usuario, id_tipo_documento, id_estado_pago)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id;
    `;
    const valoresVenta = [
      datosVenta.fecha, 
      datosVenta.valor_total_impuesto, 
      datosVenta.valor_total_neto, 
      datosVenta.valor_total_bruto, 
      datosVenta.prioridad_urgencia_medica, 
      datosVenta.id_usuario, 
      datosVenta.id_tipo_documento, 
      datosVenta.id_estado_pago
    ];
    const resVenta = await client.query(insertVenta, valoresVenta);
    const idNuevaVenta = resVenta.rows[0].id;

    // 2. Iterar sobre el Carrito de Compras
    for (const item of detalles) {
      
      // A. Guardar el Detalle de la Venta
      const insertDetalle = `
        INSERT INTO detalle_venta (cantidad, valor_unidad, valor_total, id_venta, id_producto, id_impuesto)
        VALUES ($1, $2, $3, $4, $5, $6);
      `;
      const valoresDetalle = [
        item.cantidad, 
        item.valor_unidad, 
        item.valor_total, 
        idNuevaVenta, 
        item.id_producto, 
        item.id_impuesto
      ];
      await client.query(insertDetalle, valoresDetalle);

      // B. Descontar el Stock Físico
      const updateStock = `
        UPDATE stock_bodega
        SET cantidad = cantidad - $1
        WHERE id_producto = $2 AND id_bodega = $3
        RETURNING cantidad;
      `;
      const resStock = await client.query(updateStock, [item.cantidad, item.id_producto, item.id_bodega]);

      // Validaciones de seguridad de la base de datos
      if (resStock.rowCount === 0) {
        throw new Error(`El producto ID ${item.id_producto} no tiene stock registrado en la bodega ${item.id_bodega}.`);
      }
      if (resStock.rows[0].cantidad < 0) {
        throw new Error(`Stock insuficiente para el producto ID ${item.id_producto} en la bodega ${item.id_bodega}.`);
      }
    }

    await client.query('COMMIT');
    return idNuevaVenta;

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
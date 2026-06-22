import pool from '../config/db.js';

export const registrarIngreso = async (datosIngreso, detalles) => {
  // En lugar de usar pool.query directo, pedimos un 'cliente' dedicado para la transacción
  const client = await pool.connect();

  try {
    // 1. Iniciamos la transacción (caja de seguridad)
    await client.query('BEGIN');

    // 2. Guardamos la cabecera del ingreso
    const insertIngreso = `
      INSERT INTO ingreso_producto (fecha, total_compra_neto, total_compra_bruto, total_compra_impuesto, id_bodega)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;
    `;
    const valoresIngreso = [
      datosIngreso.fecha, 
      datosIngreso.total_compra_neto, 
      datosIngreso.total_compra_bruto, 
      datosIngreso.total_compra_impuesto, 
      datosIngreso.id_bodega
    ];
    const resIngreso = await client.query(insertIngreso, valoresIngreso);
    const idNuevoIngreso = resIngreso.rows[0].id;

    // 3. Iteramos sobre cada producto escaneado (el detalle)
    for (const item of detalles) {
      
      // A. Guardamos el detalle histórico de la compra
      const insertDetalle = `
        INSERT INTO detalle_compra (valor_unidad, cantidad, fecha_fabricacion, fecha_caducidad, id_ingreso_producto, id_producto, id_impuesto)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
      `;
      const valoresDetalle = [
        item.valor_unidad, 
        item.cantidad, 
        item.fecha_fabricacion, 
        item.fecha_caducidad, 
        idNuevoIngreso, 
        item.id_producto, 
        item.id_impuesto
      ];
      await client.query(insertDetalle, valoresDetalle);

      // B. Actualizamos el Stock Físico (UPSERT)
      // Gracias a tu restricción "stock_unico_por_bodega", podemos decirle a SQL:
      // "Si no existe, insértalo. Si ya existe, súmale la cantidad."
console.log("Datos del item actual:", item);

      const upsertStock = `
        INSERT INTO stock_bodega (id_bodega, id_producto, cantidad)
        VALUES ($1, $2, $3)
        ON CONFLICT (id_bodega, id_producto) 
        DO UPDATE SET cantidad = stock_bodega.cantidad + EXCLUDED.cantidad;
      `;
      await client.query(upsertStock, [datosIngreso.id_bodega, item.id_producto, item.cantidad]);
    }

    // 4. Si todo salió perfecto, sellamos la caja de seguridad y guardamos en disco
    await client.query('COMMIT');
    return { id_ingreso: idNuevoIngreso, mensaje: 'Ingreso y stock actualizados correctamente' };

  } catch (error) {
    // Si cualquier INSERT falla, deshacemos todo para evitar bases de datos corruptas
    await client.query('ROLLBACK');
    throw error;
  } finally {
    // Siempre liberamos el cliente al terminar
    client.release();
  }
};
import pool from '../config/db.js';

/**
 * 1. REGISTRAR STOCK INICIAL
 * Se usa cuando un producto ingresa por primera vez a una bodega específica.
 */
export const asociarStockBodega = async (idProducto, idBodega, cantidad) => {
    const consulta = `
        INSERT INTO stock_bodega (id_producto, id_bodega, cantidad)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const valores = [idProducto, idBodega, cantidad];
    const result = await pool.query(consulta, valores);
    return result.rows[0];
};

/**
 * 2. MODIFICAR CANTIDAD (Sumar o Restar)
 * Se usa al vender (restar) o al abastecer la bodega (sumar).
 * El parámetro 'cantidad' puede ser positivo (ej: 10) o negativo (ej: -5).
 */
export const actualizarCantidadStock = async (idProducto, idBodega, cantidad) => {
    const consulta = `
        UPDATE stock_bodega
        SET cantidad = cantidad + $1
        WHERE id_producto = $2 AND id_bodega = $3
        RETURNING *;
    `;
    const valores = [cantidad, idProducto, idBodega];
    const result = await pool.query(consulta, valores);
    return result.rows[0];
};

/**
 * 3. CONSULTAR INVENTARIO DE UN PRODUCTO
 * Hace el puente de 3 tablas (producto -> stock_bodega -> bodega)
 * para saber en qué bodegas físicas hay existencias de un medicamento.
 */
export const obtenerStockPorProducto = async (idProducto) => {
    const consulta = `
        SELECT 
        sb.cantidad,
        b.nombre AS nombre_bodega,
        b.direccion
        FROM stock_bodega sb
        INNER JOIN bodega b ON sb.id_bodega = b.id
        WHERE sb.id_producto = $1;
    `;
    const result = await pool.query(consulta, [idProducto]);
    return result.rows; // Devuelve la lista de bodegas con sus cantidades
};
import * as stockRepository from '../repositories/stockRepository.js';
import pool from '../config/db.js';
export const inicializarStock = async (idProducto, idBodega, cantidad) => {
    if (cantidad < 0) {
        throw new Error('No puedes inicializar un stock con valores negativos.');
    }
    return await stockRepository.asociarStockBodega(idProducto, idBodega, cantidad);
};


export const modificarStock = async (id_producto, id_bodega, cantidad) => {
    const consulta = `
        INSERT INTO stock (id_producto, id_bodega, cantidad)
        VALUES ($1, $2, $3)
        ON CONFLICT (id_producto, id_bodega) 
        DO UPDATE SET cantidad = $3
        RETURNING *;
    `;
    
    const { rows } = await pool.query(consulta, [id_producto, id_bodega, cantidad]);
    return rows[0];
};

export const consultarInventario = async (idProducto) => {
    if (!idProducto) {
        throw new Error('Debes proporcionar el ID del producto.');
    }
    return await stockRepository.obtenerStockPorProducto(idProducto);
};
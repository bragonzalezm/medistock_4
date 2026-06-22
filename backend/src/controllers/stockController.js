import * as stockService from '../services/stockService.js';
import pool from '../config/db.js';

export const postStockInicial = async (req, res) => {
    try {
        const { id_producto, id_bodega, cantidad } = req.body;
        const nuevoStock = await stockService.inicializarStock(id_producto, id_bodega, cantidad);
        
        res.status(201).json(nuevoStock);
    } catch (error) {
        res.status(400).json({ error: error.message || 'Error al inicializar el stock' });
    }
};

export const putActualizarStock = async (req, res) => {
    try {
        // 1. Extraemos los datos que envía Postman
        const { id_producto, id_bodega, cantidad } = req.body;
        
        // 2. Se los pasamos al servicio que acabamos de arreglar
        const stockActualizado = await stockService.modificarStock(id_producto, id_bodega, cantidad);
        
        // 3. Respondemos con éxito (HTTP 200)
        res.status(200).json(stockActualizado);
    } catch (error) {
        res.status(400).json({ error: error.message || 'Error al actualizar el stock' });
    }
};

export const getStockPorProducto = async (req, res) => {
    try {
        // Usamos req.params porque el ID vendrá en la URL (ej: /api/stock/producto/5)
        const { idProducto } = req.params;
        const inventario = await stockService.consultarInventario(idProducto);
        
        res.status(200).json(inventario);
    } catch (error) {
        res.status(400).json({ error: error.message || 'Error al consultar el inventario' });
    }
};
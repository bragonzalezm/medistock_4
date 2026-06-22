import * as stockService from '../services/stockService.js';

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
        const { id_producto, id_bodega, cantidad } = req.body;
        const stockActualizado = await stockService.modificarStock(id_producto, id_bodega, cantidad);
        
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
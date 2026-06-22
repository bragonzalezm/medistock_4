import * as stockRepository from '../repositories/stockRepository.js';

export const inicializarStock = async (idProducto, idBodega, cantidad) => {
    if (cantidad < 0) {
        throw new Error('No puedes inicializar un stock con valores negativos.');
    }
    return await stockRepository.asociarStockBodega(idProducto, idBodega, cantidad);
};

export const modificarStock = async (idProducto, idBodega, cantidad) => {
  // Aquí podrías agregar validaciones extra si es necesario
    return await stockRepository.actualizarCantidadStock(idProducto, idBodega, cantidad);
};

export const consultarInventario = async (idProducto) => {
    if (!idProducto) {
        throw new Error('Debes proporcionar el ID del producto.');
    }
    return await stockRepository.obtenerStockPorProducto(idProducto);
};
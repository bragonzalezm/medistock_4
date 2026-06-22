import * as productoRepository from '../repositories/productoRepository.js';

export const listarProductos = async () => {
  return await productoRepository.obtenerTodos();
};

export const crearProducto = async (nombre, codigoBarras, idCategoria, idMedicion) => {
  if (!nombre || !codigoBarras) {
    throw new Error('El nombre y el código de barras son obligatorios.');
  }
  return await productoRepository.registrarProducto(nombre, codigoBarras, idCategoria, idMedicion);
};

export const editarProducto = async (id, nombre, codigoBarras, idCategoria, idMedicion) => {
  // Regla de negocio: Verificar primero si el producto existe
  const productoExiste = await productoRepository.obtenerPorId(id);
  if (!productoExiste) {
    throw new Error(`El producto con ID ${id} no existe en el sistema.`);
  }

  if (!nombre || !codigoBarras) {
    throw new Error('El nombre y el código de barras no pueden quedar vacíos.');
  }

  return await productoRepository.actualizarProducto(id, nombre, codigoBarras, idCategoria, idMedicion);
};
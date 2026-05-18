import * as productoRepository from '../repositories/productoRepository.js';

export const listarProductos = async () => {
  const productos = await productoRepository.obtenerTodos();
  
  if (!productos || productos.length === 0) {
    throw new Error('No hay productos disponibles en el inventario');
  }
  
  return productos;
};

export const agregarProductos = async (productoData) => {
  if (!productoData.nombre || !productoData.id_categoria || !productoData.id_tipo_medicion) {
    throw new Error('El nombre, la categoría y el tipo de medición son obligatorios');
  }

  const nuevoProducto = await productoRepository.crearProducto(productoData);
  return nuevoProducto;
};
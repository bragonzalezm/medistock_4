import * as productoService from '../services/productoService.js';

export const getProductos = async (req, res) => {
  try {
    const productos = await productoService.listarProductos();
    
    res.status(200).json({
      status: 'success',
      cantidad: productos.length,
      data: productos
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const postProductos = async (req, res) => {
  try {
    const nuevoProducto = await productoService.agregarProductos(req.body);
    
    // Status 201 significa "Creado exitosamente"
    res.status(201).json({
      status: 'success',
      message: 'Producto registrado en la base de datos',
      data: nuevoProducto
    });
  } catch (error) {
    // Status 400 significa "Bad Request" (Error del cliente al enviar datos)
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};
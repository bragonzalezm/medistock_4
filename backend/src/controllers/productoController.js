import * as productoService from '../services/productoService.js';

export const getProductos = async (req, res) => {
  try {
    const productos = await productoService.listarProductos();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos.' });
  }
};

export const postProducto = async (req, res) => {
  try {
    const { nombre, codigo_barras, id_categoria, id_tipo_medicion } = req.body;
    const nuevoProducto = await productoService.crearProducto(nombre, codigo_barras, id_categoria, id_tipo_medicion);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const putProducto = async (req, res) => {
  try {
    const { id } = req.params; // Extrae el ID de la URL (ej: /api/productos/5)
    const { nombre, codigo_barras, id_categoria, id_tipo_medicion } = req.body;
    
    const productoActualizado = await productoService.editarProducto(id, nombre, codigo_barras, id_categoria, id_tipo_medicion);
    res.status(200).json(productoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
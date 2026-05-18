import pool from '../config/db.js';

export const obtenerTodos = async () => {
  const result = await pool.query('SELECT * FROM producto');
  return result.rows;
};

export const crearProducto = async (producto) => {
  const { nombre, codigo_barras, id_categoria, id_tipo_medicion } = producto;
  
  const result = await pool.query(
    'INSERT INTO producto (nombre, codigo_barras, id_categoria, id_tipo_medicion) VALUES ($1, $2, $3, $4) RETURNING *',
    [nombre, codigo_barras, id_categoria, id_tipo_medicion]
  );
  
  return result.rows[0];
};
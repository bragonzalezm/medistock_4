import pool from '../config/db.js';

// 1. OBTENER TODOS LOS PRODUCTOS (Con nombres en lugar de IDs)
export const obtenerTodos = async () => {
  const consulta = `
    SELECT 
      p.id, 
      p.nombre, 
      p.codigo_barras, 
      c.nombre AS nombre_categoria, 
      tm.nombre AS tipo_medicion
    FROM producto p
    INNER JOIN categoria c ON p.id_categoria = c.id
    INNER JOIN tipo_medicion tm ON p.id_tipo_medicion = tm.id
    ORDER BY p.nombre ASC;
  `;
  const result = await pool.query(consulta);
  return result.rows;
};

// 2. BUSCAR UN PRODUCTO POR ID (Para validar existencia)
export const obtenerPorId = async (id) => {
  const consulta = 'SELECT * FROM producto WHERE id = $1;';
  const result = await pool.query(consulta, [id]);
  return result.rows[0];
};

// 3. REGISTRAR UN PRODUCTO (El POST que ya tenías)
export const registrarProducto = async (nombre, codigoBarras, idCategoria, idMedicion) => {
  const consulta = `
    INSERT INTO producto (nombre, codigo_barras, id_categoria, id_tipo_medicion)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const valores = [nombre, codigoBarras, idCategoria, idMedicion];
  const result = await pool.query(consulta, valores);
  return result.rows[0];
};

// 4. ACTUALIZAR UN PRODUCTO (Nuevo método PUT)
export const actualizarProducto = async (id, nombre, codigoBarras, idCategoria, idMedicion) => {
  const consulta = `
    UPDATE producto 
    SET nombre = $1, codigo_barras = $2, id_categoria = $3, id_tipo_medicion = $4
    WHERE id = $5
    RETURNING *;
  `;
  const valores = [nombre, codigoBarras, idCategoria, idMedicion, id];
  const result = await pool.query(consulta, valores);
  return result.rows[0];
};
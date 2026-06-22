import pool from '../config/db.js';

export const buscarPorCorreo = async (correo) => {
  const consulta = 'SELECT * FROM usuario WHERE correo_electronico = $1;';
  const result = await pool.query(consulta, [correo]);
  return result.rows[0]; // Devuelve el usuario si existe, o undefined si no
};

export const registrarUsuario = async (usuario) => {
  const consulta = `
    INSERT INTO usuario (nombre_usuario, contrasena, correo_electronico, telefono, id_rol_usuario, id_tipo_cliente, id_clinica)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id, nombre_usuario, correo_electronico, id_rol_usuario;
  `;
  const valores = [
    usuario.nombre_usuario,
    usuario.contrasena, // Esta contraseña ya llegará encriptada desde el Servicio
    usuario.correo_electronico,
    usuario.telefono,
    usuario.id_rol_usuario,
    usuario.id_tipo_cliente || null, // null si es un cliente normal
    usuario.id_clinica || null       // null si no es una clínica
  ];
  const result = await pool.query(consulta, valores);
  return result.rows[0];
};
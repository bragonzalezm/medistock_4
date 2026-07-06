import pool from '../config/db.js';


// Sirve para validar si el correo electronico ya esta registrado
export const buscarPorCorreo = async (correo) => {
  const consulta = 'SELECT * FROM usuario WHERE correo_electronico = $1;';
  const result = await pool.query(consulta, [correo]);
  return result.rows[0]; // Devuelve el usuario si existe, o undefined si no
};


// Sirve para registrar al usuario 
export const registrarUsuario = async (usuario) => {
  try {
    const consulta = `
      INSERT INTO usuario (nombre_completo, apellido_paterno, apellido_materno, contrasena, correo_electronico, telefono, id_rol_usuario, id_tipo_cliente, id_clinica)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id, correo_electronico, id_rol_usuario;
    `;
    const valores = [
      usuario.nombre_completo,
      usuario.apellido_paterno,
      usuario.apellido_materno,
      usuario.contrasena, // Esta contraseña ya llegará encriptada desde el Servicio
      usuario.correo_electronico,
      usuario.telefono,
      usuario.id_rol_usuario ?? 1, // por defecto queda en 1 que es el id de un usuario paciente 
      usuario.id_tipo_cliente ?? 2, // por defecto queda en 2 que es el id de cliente particular
      usuario.id_clinica ?? null       // null si no es una clínica
    ];
    const result = await pool.query(consulta, valores);
    return result.rows[0];
  }
  catch (error) {
    console.error("Error en la base de datos", error.message);
    res.status(500).json({ mensaje: "Ocurrió un error interno en el servidor."});
  }
  finally {
    console.log("Petición de usuario procesada.");
  }
};
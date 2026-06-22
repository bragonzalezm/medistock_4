import * as usuarioService from '../services/usuarioService.js';
import pool from '../config/db.js';
import bcrypt from 'bcrypt'; // <-- IMPORTA BCRYPT AQUÍ ARRIBA
export const postRegistro = async (req, res) => {
  try {
    const nuevoUsuario = await usuarioService.registrar(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const postLogin = async (req, res) => {
  try {
    const { correo_electronico, contrasena } = req.body;
    const credenciales = await usuarioService.login(correo_electronico, contrasena);
    res.status(200).json(credenciales);
  } catch (error) {
    // 401 significa "No Autorizado"
    res.status(401).json({ error: error.message });
  }
};

export const registrarUsuario = async (req, res) => {
    try {
        const nombreFinal = req.body.nombre || req.body.nombre_usuario;
        const { correo_electronico, contrasena } = req.body;

        if (!nombreFinal || !correo_electronico || !contrasena) {
            return res.status(400).json({ error: 'Todos los campos básicos son obligatorios' });
        }

        // ENCRIPTIÓN: Hasheamos la contraseña antes de guardarla en la base de datos
        const saldos = 10;
        const contrasenaEncriptada = await bcrypt.hash(contrasena, saldos);

        const id_rol_usuario = 1;
        const id_tipo_cliente = 2;
        const id_clinica = null;
        const telefono = null;

        const consulta = `
            INSERT INTO usuario (nombre_usuario, correo_electronico, contrasena, telefono, id_tipo_cliente, id_clinica, id_rol_usuario)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, nombre_usuario, correo_electronico, id_rol_usuario;
        `;
        
        // Pasamos 'contrasenaEncriptada' en lugar de 'contrasena'
        const { rows } = await pool.query(consulta, [
            nombreFinal, 
            correo_electronico, 
            contrasenaEncriptada, // <-- CAMBIO AQUÍ
            telefono,
            id_tipo_cliente,
            id_clinica,
            id_rol_usuario
        ]);

        res.status(201).json({ 
            mensaje: 'Usuario registrado exitosamente', 
            usuario: rows[0] 
        });

    } catch (error) {
        console.error("Error en registro:", error);
        if (error.code === '23505') {
            return res.status(400).json({ error: 'Este correo electrónico ya está registrado' });
        }
        res.status(500).json({ error: 'Error del servidor: ' + error.message });
    }
};
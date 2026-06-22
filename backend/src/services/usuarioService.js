import * as usuarioRepository from '../repositories/usuarioRepository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// En un entorno real, esta clave se guarda en un archivo oculto .env
const FIRMA_SECRETA = 'medistock_clave_super_segura_2026'; 

export const registrar = async (datosUsuario) => {
  // 1. Verificamos que el correo no exista
  const usuarioExiste = await usuarioRepository.buscarPorCorreo(datosUsuario.correo_electronico);
  if (usuarioExiste) {
    throw new Error('Este correo electrónico ya está registrado en Medistock.');
  }

  // 2. Encriptamos la contraseña
  const salt = await bcrypt.genSalt(10);
  const contrasenaEncriptada = await bcrypt.hash(datosUsuario.contrasena, salt);

  // 3. Reemplazamos la clave plana por la encriptada y guardamos
  datosUsuario.contrasena = contrasenaEncriptada;
  return await usuarioRepository.registrarUsuario(datosUsuario);
};

export const login = async (correo, contrasenaPlana) => {
  // 1. Buscamos al usuario
  const usuario = await usuarioRepository.buscarPorCorreo(correo);
  if (!usuario) {
    throw new Error('Credenciales inválidas.');
  }

  // 2. Comparamos la contraseña escrita con la encriptada en la base de datos
  const esValida = await bcrypt.compare(contrasenaPlana, usuario.contrasena);
  if (!esValida) {
    throw new Error('Credenciales inválidas.');
  }

  // 3. Generamos el Token JWT (El "Pase VIP")
  const token = jwt.sign(
    { id: usuario.id, rol: usuario.id_rol_usuario },
    FIRMA_SECRETA,
    { expiresIn: '2h' } // El pase caduca en 2 horas
  );

  return {
    mensaje: 'Inicio de sesión exitoso',
    token: token,
    usuario: { id: usuario.id, nombre: usuario.nombre_usuario, correo: usuario.correo_electronico }
  };
};
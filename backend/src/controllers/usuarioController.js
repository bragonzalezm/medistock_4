import * as usuarioService from '../services/usuarioService.js';

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
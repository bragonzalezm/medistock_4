import pool from '../config/db.js';

export const obtenerRegion = async () => {
    const result = await pool.query('SELECT * FROM region ORDER BY id');
    return result.rows;
};

export const obtenerComuna = async () => {
    const result = await pool.query('SELECT * FROM comuna ORDER BY id');
    return result.rows;
};

export const obtenerRolUsuario = async () => {
    const result = await pool.query('SELECT * FROM rol_usuario ORDER BY nombre');
    return result.rows;
};

export const obtenerEstadoSeguimiento = async () => {
    const result = await pool.query('SELECT * FROM estado_seguimiento ORDER BY nombre');
    return result.rows;
};

export const obtenerTipoCliente = async () => {
    const result = await pool.query('SELECT * FROM tipo_cliente');
    return result.rows;
};

export const obtenerTipoMedicion = async () => {
    const result = await pool.query('SELECT * FROM tipo_medicion');
    return result.rows;
};

export const obtenerCategoria = async () => {
    const result = await pool.query('SELECT * FROM categoria');
    return result.rows;
};

export const obtenerTipoDocumento = async () => {
    const result = await pool.query('SELECT * FROM tipo_documento');
    return result.rows;
};

export const obtenerEstadoPago = async () => {
    const result = await pool.query('SELECT * FROM estado_pago');
    return result.rows;
};

export const obtenerTipoDespacho = async () => {
    const result = await pool.query('SELECT * FROM tipo_despacho');
    return result.rows;
};

export const obtenerImpuesto = async () => {
    const result = await pool.query('SELECT * FROM impuesto');
    return result.rows;
};

export const obtenerBodega = async () => {
    const result = await pool.query('SELECT * FROM bodega');
    return result.rows;
};
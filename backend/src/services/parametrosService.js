import * as parametrosRepository from '../repositories/parametrosRepository.js';

export const listarRegion = async () => {
    return await parametrosRepository.obtenerRegion();
};

export const listarComuna = async () => {
    return await parametrosRepository.obtenerComuna();
};

export const listarRolUsuario = async () => {
    return await parametrosRepository.obtenerRolUsuario();
};

export const listarEstadoSeguimiento = async () => {
    return await parametrosRepository.obtenerEstadoSeguimiento();
};

export const listarTipoCliente = async () => {
    return await parametrosRepository.obtenerTipoCliente();
};

export const listarTipoMedicion = async () => {
    return await parametrosRepository.obtenerTipoMedicion();
};

export const listarCategoria = async () => {
    return await parametrosRepository.obtenerCategoria();
};

export const listarTipoDocumento = async () => {
    return await parametrosRepository.obtenerTipoDocumento();
};

export const listarEstadoPago = async () => {
    return await parametrosRepository.obtenerEstadoPago();
};

export const listarTipoDespacho = async () => {
    return await parametrosRepository.obtenerTipoDespacho();
};

export const listarImpuesto = async () => {
    return await parametrosRepository.obtenerImpuesto();
};

export const listarbodega = async () => {
    return await parametrosRepository.obtenerBodega();
};
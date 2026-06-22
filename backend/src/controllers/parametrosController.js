import * as parametrosService from '../services/parametrosService.js';

export const getRegiones = async (req, res) => {
    const regiones = await parametrosService.listarRegion();
    res.json(regiones);
};

export const getComunas = async (req, res) => {
    const comunas = await parametrosService.listarComuna();
    res.json(comunas);
};

export const getRolUsuarios = async (req, res) => {
    const rolUsuarios = await parametrosService.listarRolUsuario();
    res.json(rolUsuarios);
};

export const getEstadoSeguimientos = async (req, res) => {
    const estadoSeguimientos = await parametrosService.listarEstadoSeguimiento();
    res.json(estadoSeguimientos);
};

export const getTipoClientes = async (req, res) => {
    const tipoClientes = await parametrosService.listarTipoCliente();
    res.json(tipoClientes);
};

export const getTipoMedicion = async (req, res) => {
    const tipoMedicion = await parametrosService.listarTipoMedicion();
    res.json(tipoMedicion);
};

export const getCategorias = async (req, res) => {
    const categorias = await parametrosService.listarCategoria();
    res.json(categorias);
};

export const getTipoDocumentos = async (req, res) => {
    const tipoDocumentos = await parametrosService.listarTipoDocumento();
    res.json(tipoDocumentos);
};

export const getEstadoPagos = async (req, res) => {
    const estadoPagos = await parametrosService.listarEstadoPago();
    res.json(estadoPagos);
};

export const getTipoDespachos = async (req, res) => {
    const tipoDespachos = await parametrosService.listarTipoDespacho();
    res.json(tipoDespachos);
};

export const getImpuestos = async (req, res) => {
    const impuestos = await parametrosService.listarImpuesto();
    res.json(impuestos);
};

export const getBodegas = async (req, res) => {
    const bodegas = await parametrosService.listarbodega();
    res.json(bodegas);
};
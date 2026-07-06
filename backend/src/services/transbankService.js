// backend/src/services/transbankService.js
import { WebpayPlus, Options, IntegrationCommerceCodes, IntegrationApiKeys, Environment } from 'transbank-sdk';

// 1. Instancia Global (Se ejecuta una sola vez al iniciar el backend)
const opciones = new Options(
  IntegrationCommerceCodes.WEBPAY_PLUS,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
);
const tx = new WebpayPlus.Transaction(opciones);

export const iniciarPago = async (monto, idVenta) => {
  const ordenCompra = `ORDEN-${idVenta}`;
  const idSesion = `SESION-${Date.now()}`;
  const urlRetorno = 'http://localhost:3000/api/pagos/confirmar'; 

  // 2. Usamos la instancia global 'tx'
  const respuesta = await tx.create(
    ordenCompra,
    idSesion,
    monto,
    urlRetorno
  );

  return respuesta; 
};

export const confirmarPago = async (tokenWs) => {
  if (!tokenWs) {
    throw new Error('No se recibió el token de Transbank.');
  }

  // Usamos la misma instancia global
  const respuesta = await tx.commit(tokenWs);
  
  return respuesta; 
};
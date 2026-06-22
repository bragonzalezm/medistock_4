import { WebpayPlus, Options, IntegrationCommerceCodes, IntegrationApiKeys, Environment } from 'transbank-sdk';

export const iniciarPago = async (monto, idVenta) => {
  const ordenCompra = `ORDEN-${idVenta}`;
  const idSesion = `SESION-${Date.now()}`;
  const urlRetorno = 'http://localhost:3000/api/pagos/confirmar'; 

  // 1. Configuramos explícitamente el entorno de pruebas (Sandbox)
  const opciones = new Options(
    IntegrationCommerceCodes.WEBPAY_PLUS,
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
  );

  // 2. Inyectamos las opciones a la transacción
  const tx = new WebpayPlus.Transaction(opciones);
  
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

  // 1. Configuramos explícitamente el entorno de pruebas
  const opciones = new Options(
    IntegrationCommerceCodes.WEBPAY_PLUS,
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
  );

  // 2. Inyectamos las opciones a la transacción
  const tx = new WebpayPlus.Transaction(opciones);
  
  const respuesta = await tx.commit(tokenWs);
  
  return respuesta; 
};
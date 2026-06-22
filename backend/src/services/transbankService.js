import { WebpayPlus } from 'transbank-sdk';

/**
 * 1. CREAR LA TRANSACCIÓN
 * Se llama justo cuando el usuario presiona "Ir a pagar" en el carrito.
 */
export const iniciarPago = async (monto, idVenta) => {
  const ordenCompra = `ORDEN-${idVenta}`;
  const idSesion = `SESION-${Date.now()}`;
  // Esta es la URL de tu frontend a la que Transbank enviará al usuario después de pagar
  const urlRetorno = 'http://localhost:3000/api/pagos/confirmar'; 

  // Transbank nos devolverá un objeto con { token, url }
  const respuesta = await WebpayPlus.Transaction.create(
    ordenCompra,
    idSesion,
    monto,
    urlRetorno
  );

  return respuesta; 
};

/**
 * 2. CONFIRMAR LA TRANSACCIÓN
 * Webpay llama a esta función automáticamente después de que el cliente pone su tarjeta.
 */
export const confirmarPago = async (tokenWs) => {
  if (!tokenWs) {
    throw new Error('No se recibió el token de Transbank.');
  }

  // Confirmamos con Transbank si los fondos realmente existen y fueron capturados
  const respuesta = await WebpayPlus.Transaction.commit(tokenWs);
  return respuesta; 
};
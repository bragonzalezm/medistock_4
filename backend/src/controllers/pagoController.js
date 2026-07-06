// backend/src/controllers/pagoController.js
import * as transbankService from '../services/transbankService.js';
import pool from '../config/db.js';

export const postIniciarPago = async (req, res) => {
  try {
    const { monto, id_venta } = req.body;
    const transaccion = await transbankService.iniciarPago(monto, id_venta);
    res.status(200).json(transaccion);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error al conectar con Transbank' });
  }
};

export const getConfirmarPago = async (req, res) => {
  const URL_FRONTEND = 'http://127.0.0.1:5500/frontend/src/pages/resultado-pago.html';

  try {
    const token_ws = req.query.token_ws;
    
    // Si el usuario presiona "Anular" en Webpay, redirigimos limpiamente
    if (!token_ws) {
      return res.redirect(`${URL_FRONTEND}?pago=anulado`);
    }

    const respuesta = await transbankService.confirmarPago(token_ws);

    if (respuesta.response_code === 0) {
      const idVenta = respuesta.buy_order.split('-')[1];

      const consulta = `
        UPDATE venta 
        SET id_estado_pago = 2, codigo_autorizacion = $1, transaccion_token = $2, fecha_pago = NOW()
        WHERE id = $3;
      `;
      await pool.query(consulta, [respuesta.authorization_code, token_ws, idVenta]);

      // Redirección de éxito
      return res.redirect(`${URL_FRONTEND}?pago=exito&orden=${idVenta}`);

    } else {
      // Redirección de rechazo (tarjeta sin fondos)
      return res.redirect(`${URL_FRONTEND}?pago=rechazado`);
    }
  } catch (error) {
    // Si el servidor de Transbank cae o hay un error de código, redirigimos con error general
    console.error("Error en el proceso de pago:", error.message);
    return res.redirect(`${URL_FRONTEND}?pago=error_sistema`);
  }
};
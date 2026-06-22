import * as transbankService from '../services/transbankService.js';
import pool from '../config/db.js'; // Importamos pool para actualizar el estado

export const postIniciarPago = async (req, res) => {
  try {
    const { monto, id_venta } = req.body;
    
    // Obtenemos la URL y el Token desde Transbank
    const transaccion = await transbankService.iniciarPago(monto, id_venta);
    
    // Le enviamos esto al frontend para que redirija al cliente a la pantalla de Webpay
    res.status(200).json(transaccion);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error al conectar con Transbank' });
  }
};

export const getConfirmarPago = async (req, res) => {
  try {
    // Cuando el cliente paga, Transbank lo devuelve a esta ruta enviando el token en la URL
    const token_ws = req.query.token_ws;
    
    if (!token_ws) {
      throw new Error('Transacción cancelada o token no recibido.');
    }

    // Confirmamos la captura de los fondos con Transbank
    const respuesta = await transbankService.confirmarPago(token_ws);

    // response_code === 0 significa que la tarjeta tenía saldo y el pago fue exitoso
    if (respuesta.response_code === 0) {
      // Extraemos el ID de la venta que mandamos en el paso anterior (ej: "ORDEN-5" -> 5)
      const idVenta = respuesta.buy_order.split('-')[1];

      // Actualizamos la base de datos: Estado 2 = Aprobado, y guardamos el comprobante
      const consulta = `
        UPDATE venta 
        SET id_estado_pago = 2, codigo_autorizacion = $1, transaccion_token = $2, fecha_pago = NOW()
        WHERE id = $3;
      `;
      await pool.query(consulta, [respuesta.authorization_code, token_ws, idVenta]);

    res.redirect(`http://127.0.0.1:5500/frontend/index.html?pago=exito&orden=${idVenta}`);

    } else {
      // Redirección en caso de que la tarjeta sea rechazada
      res.redirect(`http://127.0.0.1:5500/frontend/index.html?pago=rechazado`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
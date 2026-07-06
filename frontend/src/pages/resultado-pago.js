document.addEventListener('DOMContentLoaded', () => {
    // 1. Extraemos los parámetros de la URL actual
    const parametros = new URLSearchParams(window.location.search);
    const estadoPago = parametros.get('pago');
    const orden = parametros.get('orden');

    // 2. Capturamos los elementos del DOM
    const icono = document.getElementById('icono-estado');
    const titulo = document.getElementById('titulo-estado');
    const mensaje = document.getElementById('mensaje-estado');
    const cajaOrden = document.getElementById('caja-orden');
    const numeroOrden = document.getElementById('numero-orden');

    // 3. Evaluamos el estado entregado por el backend
    switch (estadoPago) {
        case 'exito':
            icono.textContent = '✅';
            titulo.textContent = '¡Pago Exitoso!';
            titulo.style.color = 'var(--color-primario)'; // Verde turquesa de Medistock
            mensaje.textContent = 'Tu transacción ha sido aprobada. El pago ha sido registrado en el sistema y el comprobante está asociado a la venta.';
            
            // Si hay número de orden, mostramos la caja
            if (orden) {
                numeroOrden.textContent = `#${orden}`;
                cajaOrden.style.display = 'block';
            }
            break;

        case 'rechazado':
            icono.textContent = '❌';
            titulo.textContent = 'Pago Rechazado';
            titulo.style.color = '#ef4444'; // Rojo advertencia
            mensaje.textContent = 'Tu tarjeta fue rechazada por falta de fondos o problemas de autorización con el banco emisor. No se ha realizado ningún cargo a tu cuenta.';
            break;

        case 'anulado':
            icono.textContent = '⚠️';
            titulo.textContent = 'Pago Anulado';
            titulo.style.color = '#f59e0b'; // Naranja advertencia
            mensaje.textContent = 'Has cancelado el proceso de pago en la plataforma de Transbank. Tu orden sigue pendiente y puedes volver a intentarlo cuando lo desees.';
            break;

        case 'error_sistema':
            icono.textContent = '⚙️';
            titulo.textContent = 'Error de Conexión';
            titulo.style.color = '#ef4444';
            mensaje.textContent = 'Ocurrió una interrupción al intentar validar el token de Transbank. Por favor, revisa tu cartola bancaria antes de intentar procesar el pago nuevamente.';
            break;

        default:
            // Si el usuario entra directamente a resultado-pago.html sin haber comprado nada
            icono.textContent = '❓';
            titulo.textContent = 'Estado Desconocido';
            mensaje.textContent = 'No se encontraron datos de transacciones recientes en esta sesión.';
            break;
    }
});
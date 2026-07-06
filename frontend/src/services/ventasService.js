const API_URL = 'http://localhost:3000/api';

export const ventasService = {
    obtenerProductos: async () => {
        const respuesta = await fetch(`${API_URL}/productos`);
        if (!respuesta.ok) throw new Error('Error al cargar el catálogo');
        return await respuesta.json();
    },

    obtenerIndicadores: async () => {
        const respuesta = await fetch(`${API_URL}/indicadores`);
        if (!respuesta.ok) throw new Error('Error al cargar indicadores financieros');
        return await respuesta.json();
    },

    procesarVenta: async (payloadVenta) => {
        const token = localStorage.getItem('medistock_token');
        const respuesta = await fetch(`${API_URL}/ventas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payloadVenta)
        });
        
        const data = await respuesta.json();
        if (!respuesta.ok) throw new Error(data.error || 'Error al guardar la venta');
        return data;
    },

    iniciarPagoTransbank: async (monto, id_venta) => {
        const token = localStorage.getItem('medistock_token');
        const respuesta = await fetch(`${API_URL}/pagos/iniciar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ monto, id_venta })
        });

        const data = await respuesta.json();
        if (!respuesta.ok) throw new Error(data.error || 'Error al conectar con Webpay');
        return data;
    }
};
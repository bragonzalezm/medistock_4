const API_URL = 'http://localhost:3000/api';

const api = {
    guardarSesion: (datos) => {
        localStorage.setItem('medistock_token', datos.token);
        localStorage.setItem('medistock_usuario', JSON.stringify(datos.usuario));
    },

    cerrarSesion: () => {
        localStorage.removeItem('medistock_token');
        localStorage.removeItem('medistock_usuario');
    },

    post: async (endpoint, body) => {
        const respuesta = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        
        const data = await respuesta.json();
        if (!respuesta.ok) throw new Error(data.error || 'Error en la petición');
        return data;
    },

    get: async (endpoint) => {
        const respuesta = await fetch(`${API_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await respuesta.json();
        if (!respuesta.ok) throw new Error(data.error || 'Error en la petición');
        return data;
    }
};
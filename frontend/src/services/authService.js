const API_URL = 'http://localhost:3000/api/usuarios'; // <-- Actualizado

export const authService = {
  
  registrar: async (datosUsuario) => {
    // Esto ahora apuntará a http://localhost:3000/api/usuarios/registro
    const respuesta = await fetch(`${API_URL}/registro`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosUsuario)
    });

    const data = await respuesta.json();
    if (!respuesta.ok) {
      throw new Error(data.error || 'Error al registrar el usuario');
    }
    return data;
  },

  login: async (credenciales) => {
    // Esto ahora apuntará a http://localhost:3000/api/usuarios/login
    const respuesta = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credenciales)
    });

    const data = await respuesta.json();
    if (!respuesta.ok) {
      throw new Error(data.error || 'Credenciales inválidas');
    }
    return data;
  }
};
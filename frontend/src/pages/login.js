import { authService } from '../services/authService.js';

const formulario = document.getElementById('formulario-login');
const mensajeError = document.getElementById('mensaje-error-log');

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  mensajeError.textContent = '';

  const credenciales = {
    correo_electronico: document.getElementById('log-correo').value,
    contrasena: document.getElementById('log-contrasena').value
  };

  try {
    const respuesta = await authService.login(credenciales);
    
    // GUARDADO CRÍTICO: Almacenamos el token JWT en el navegador
    localStorage.setItem('medistock_token', respuesta.token);
    
    alert('Inicio de sesión exitoso');
    // Redirigimos al panel principal del sistema
    window.location.href = './dashboard.html';

  } catch (error) {
    mensajeError.textContent = error.message;
  }
});
// Importamos el servicio que acabamos de crear
import { authService } from '../services/authService.js';

// Capturamos los elementos del HTML
const formulario = document.getElementById('formulario-registro');
const mensajeError = document.getElementById('mensaje-error-reg');

// Escuchamos el evento 'submit' (cuando se envía el formulario)
formulario.addEventListener('submit', async (evento) => {
  // Evita que la página se recargue automáticamente
  evento.preventDefault(); 
  mensajeError.textContent = ''; // Limpiamos errores previos

  // Armamos el objeto con los datos exactamente como los espera el backend
  const datosRegistro = {
    nombre_completo: document.getElementById('reg-nombre').value,
    apellido_paterno: document.getElementById('reg-nombre').value,
    apellido_materno: document.getElementById('reg-nombre').value,
    contrasena: document.getElementById('reg-contrasena').value,
    correo_electronico: document.getElementById('reg-correo').value,
    telefono: document.getElementById('reg-telefono').value
  };

  try {
    // Llamamos al servicio
    const resultado = await authService.registrar(datosRegistro);
    
    alert('Usuario registrado con éxito. Redirigiendo al login...');
    // Redirigimos al usuario a la pantalla de login
    window.location.href = './login.html';

  } catch (error) {
    // Si el backend lanzó el throw new Error, lo mostramos en el HTML
    mensajeError.textContent = error.message;
  }
});
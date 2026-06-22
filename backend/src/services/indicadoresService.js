export const obtenerIndicadores = async () => {
  try {
    const respuesta = await fetch('https://mindicador.cl/api');
    const datos = await respuesta.json();
    
    // Retornamos un objeto limpio solo con lo que Medistock necesita
    return {
      dolar: datos.dolar.valor,
      uf: datos.uf.valor,
      fecha_actualizacion: datos.fecha
    };
  } catch (error) {
    throw new Error('Error al conectar con la API del Banco Central / Mindicador.');
  }
};
import * as ingresoRepository from '../repositories/ingresoRepository.js';

export const procesarIngreso = async (datosIngreso, detalles) => {
  // Regla 1: Debe haber al menos un producto en la lista
  if (!detalles || detalles.length === 0) {
    throw new Error('El ingreso de mercadería debe contener al menos un producto en el detalle.');
  }

  // Regla 2: Validar que los montos tengan sentido
  if (datosIngreso.total_compra_neto < 0 || datosIngreso.total_compra_bruto < 0) {
    throw new Error('Los totales de la compra no pueden ser valores negativos.');
  }

  // Si todo es correcto, pasamos la orden a la transacción SQL del repositorio
  return await ingresoRepository.registrarIngreso(datosIngreso, detalles);
};
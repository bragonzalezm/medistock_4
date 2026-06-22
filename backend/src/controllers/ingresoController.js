import * as ingresoService from '../services/ingresoService.js';

export const postIngreso = async (req, res) => {
  try {
    // Desestructuramos los dos bloques que vienen en el JSON
    const { ingreso, detalles } = req.body;
    
    const resultado = await ingresoService.procesarIngreso(ingreso, detalles);
    
    // 201 significa "Creado exitosamente"
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message || 'Error interno al registrar el ingreso' });
  }
};
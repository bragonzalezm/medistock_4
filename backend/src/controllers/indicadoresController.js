import * as indicadoresService from '../services/indicadoresService.js';

export const getIndicadoresEconomicos = async (req, res) => {
  try {
    const valores = await indicadoresService.obtenerIndicadores();
    res.status(200).json(valores);
  } catch (error) {
    res.status(502).json({ error: error.message }); // 502 Bad Gateway (Fallo de servidor externo)
  }
};
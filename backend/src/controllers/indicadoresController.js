import * as indicadoresService from '../services/indicadoresService.js';

export const getIndicadores = async (req, res) => {
    try {
        // Agregamos un ultimátum de 2 segundos (2000 milisegundos)
        const respuesta = await fetch('https://mindicador.cl/api', {
            signal: AbortSignal.timeout(2000)
        });
        
        if (!respuesta.ok) {
            throw new Error('La API de Mindicador no respondió correctamente');
        }
        
        const data = await respuesta.json();
        res.status(200).json({ uf: data.uf.valor });

    } catch (error) {
        // Al pasar los 2 segundos, Node.js aborta el intento y dispara este código instantáneamente
        console.warn('Advertencia: API externa lenta o caída. Usando UF de contingencia de inmediato.');
        
        res.status(200).json({ 
            uf: 38000.00 
        });
    }
};
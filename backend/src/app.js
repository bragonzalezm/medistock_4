import express from 'express';
import cors from 'cors';
import productoRoutes from './routes/productoRoutes.js';
import parametrosRoutes from './routes/parametrosRoutes.js';
import stockRoutes from './routes/stockRoutes.js';
import ingresoRoutes from './routes/ingresoRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import ventaRoutes from './routes/ventaRoutes.js';
import seguimientoRoutes from './routes/seguimientoRoutes.js';
import pagoRoutes from './routes/pagoRoutes.js';
import indicadoresRoutes from './routes/indicadoresRoutes.js';
const app = express();

// Middlewares globales obligatorios
app.use(cors());
app.use(express.json());

// se montan los componentes
app.use('/api/productos', productoRoutes);
app.use('/api/parametros', parametrosRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/ingresos', ingresoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/seguimiento', seguimientoRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/indicadores', indicadoresRoutes);
// Ruta base de control (Prueba de vida de la API)
app.get('/api', (req, res) => {
  res.status(200).json({ 
    status: 'logrado', 
    message: 'API de MEDISTOCK operativa y lista' 
  });
});

export default app;
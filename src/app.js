import express from 'express';
import cors from 'cors';
import productoRoutes from './routes/productoRoutes.js';

const app = express();

// Middlewares globales obligatorios
app.use(cors());
app.use(express.json());

// se montan los componentes
app.use('/api/productos', productoRoutes);

// Ruta base de control (Prueba de vida de la API)
app.get('/api', (req, res) => {
  res.status(200).json({ 
    status: 'logrado', 
    message: 'API de MEDISTOCK operativa y lista' 
  });
});

export default app;
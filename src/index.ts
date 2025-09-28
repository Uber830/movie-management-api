import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connectDatabase } from '@/utils/database';
import routes from '@/routes';
import { errorHandler, notFoundHandler } from '@/middleware/error.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para seguridad
app.use(helmet());

// CORS
app.use(cors({
    origin: '*',
    credentials: true,
}));


// Middleware para parsing JSON
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api', routes);

// Route principal
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Movie Management API by @Uber830',
        status: 'running',
        timestamp: new Date().toISOString(),
    });
});

// Ruta de health check
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
    });
});

// Rutas no encontradas y manejo de errores
app.use(notFoundHandler);
app.use(errorHandler);

// Iniciar el servidor
const startServer = async (): Promise<void> => {
    try {
        await connectDatabase(); // Database connection
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Iniciar servidor
startServer();

import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '@/types';

// Middleware para manejo de errores
export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error('Error:', error);

    const response: ApiResponse = {
        success: false,
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
    };

    res.status(500).json(response);
};

// Middleware para rutas no encontradas
export const notFoundHandler = (req: Request, res: Response): void => {
    const response: ApiResponse = {
        success: false,
        error: 'Route not found',
        message: `Route ${req.method} ${req.path} not found`,
    };

    res.status(404).json(response);
};

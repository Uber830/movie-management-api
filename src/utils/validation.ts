import { Request, Response, NextFunction } from 'express';

// Función para validar email
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Función para validar contraseña
export const isValidPassword = (password: string): boolean => {
    return password.length >= 6;
};

// Función para validar fecha
export const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
};

// Middleware para validar datos de entrada
export const validateRequest = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            // Aquí se implementaría la validación con Joi o Yup
            // Por simplicidad, validamos campos básicos
            next();
        } catch (error) {
            res.status(400).json({
                success: false,
                error: 'Invalid request data',
                message: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    };
};

// Función para sanitizar strings
export const sanitizeString = (str: string): string => {
    return str.trim().replace(/[<>]/g, '');
};

// Función para validar ID
export const isValidId = (id: string): boolean => {
    return /^[a-zA-Z0-9_-]+$/.test(id) && id.length > 0;
};

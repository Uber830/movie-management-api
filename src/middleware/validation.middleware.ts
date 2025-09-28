import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ApiResponse } from '@/types';
import {
    createUserSchema,
    loginSchema,
    createMovieSchema,
    createCategorySchema,
    idParamSchema,
    movieFiltersSchema,
    markAsWatchedSchema
} from '@/schemas/validation.schemas';

// Middleware para validación con Zod
export const validateRequest = (schema: {
    body?: z.ZodSchema;
    params?: z.ZodSchema;
    query?: z.ZodSchema;
}) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // Validar body
            if (schema.body) {
                req.body = await schema.body.parseAsync(req.body);
            }

            // Validar params
            if (schema.params) {
                req.params = await schema.params.parseAsync(req.params) as any;
            }

            // Validar query
            if (schema.query) {
                req.query = await schema.query.parseAsync(req.query) as any;
            }

            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                const response: ApiResponse = {
                    success: false,
                    error: 'Validation error',
                    message: 'Invalid request data',
                    data: {
                        errors: error.issues.map((err: any) => ({
                            field: err.path.join('.'),
                            message: err.message,
                            code: err.code,
                        })),
                    },
                };
                res.status(400).json(response);
                return;
            }

            const response: ApiResponse = {
                success: false,
                error: 'Validation failed',
                message: 'Request validation failed',
            };
            res.status(400).json(response);
        }
    };
};

// Registro
export const validateRegisterData = validateRequest({
    body: createUserSchema,
});

// Login
export const validateLoginData = validateRequest({
    body: loginSchema,
});

// Película
export const validateMovieData = validateRequest({
    body: createMovieSchema,
});

// Categoría
export const validateCategoryData = validateRequest({
    body: createCategorySchema,
});

// Parámetros de ID
export const validateIdParam = validateRequest({
    params: idParamSchema,
});

// Filtros películas
export const validateMovieFilters = validateRequest({
    query: movieFiltersSchema,
});

// Marcar película como vista
export const validateMarkAsWatched = validateRequest({
    body: markAsWatchedSchema,
});
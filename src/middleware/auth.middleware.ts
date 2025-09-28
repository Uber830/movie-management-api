import { Response, NextFunction } from 'express';
import { verifyToken, extractTokenFromHeader } from '@/utils/jwt';
import { getUserById } from '@/services/auth.service';
import { AuthenticatedRequest, ApiResponse } from '@/types';

// Middleware de autenticación
export const authenticateToken = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        const token = extractTokenFromHeader(authHeader);

        if (!token) {
            const response: ApiResponse = {
                success: false,
                error: 'Access token required',
                message: 'Authorization header with Bearer token is required',
            };
            res.status(401).json(response);
            return;
        }

        // Verificar token
        const payload = await verifyToken(token);

        // Obtener usuario
        const user = await getUserById(payload.userId);

        if (!user) {
            const response: ApiResponse = {
                success: false,
                error: 'Invalid token',
                message: 'User not found',
            };
            res.status(401).json(response);
            return;
        }

        // Agregar usuario al request
        req.user = user;
        next();
    } catch (error) {
        const response: ApiResponse = {
            success: false,
            error: 'Invalid token',
            message: error instanceof Error ? error.message : 'Token verification failed',
        };
        res.status(401).json(response);
    }
};

// Middleware opcional de autenticación (no falla si no hay token)
export const optionalAuth = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        const token = extractTokenFromHeader(authHeader);

        if (token) {
            const payload = await verifyToken(token);
            const user = await getUserById(payload.userId);

            if (user) {
                req.user = user;
            }
        }

        next();
    } catch (error) {
        // En caso de error, continuar sin usuario autenticado
        next();
    }
};

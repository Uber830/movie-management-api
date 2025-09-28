import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { JwtPayload } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Transformar secreto a Uint8Array
const secret = new TextEncoder().encode(JWT_SECRET);

// Función para generar token JWT
export const generateToken = async (payload: Omit<JwtPayload, 'iat' | 'exp'>): Promise<string> => {
    try {
        const jwt = await new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime(JWT_EXPIRES_IN)
            .sign(secret);

        return jwt;
    } catch (error) {
        throw new Error('Failed to generate token');
    }
};

// Función para verificar token
export const verifyToken = async (token: string): Promise<JwtPayload> => {
    try {
        const { payload } = await jwtVerify(token, secret, {
            algorithms: ['HS256'],
        });

        return payload as unknown as JwtPayload;
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === 'JWTExpired') {
                throw new Error('Token has expired');
            }
            if (error.name === 'JWTInvalid') {
                throw new Error('Invalid token');
            }
        }
        throw new Error('Token verification failed');
    }
};

// Función para extraer token del header Authorization
export const extractTokenFromHeader = (authHeader?: string): string | null => {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    return authHeader.substring(7);
};

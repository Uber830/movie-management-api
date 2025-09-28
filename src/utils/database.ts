import { PrismaClient } from '@prisma/client';

// Cliente Prisma
export const prisma = new PrismaClient();

// Cerrar conexión
export const disconnectDatabase = async (): Promise<void> => {
    await prisma.$disconnect();
};

// Conectar base de datos
export const connectDatabase = async (): Promise<void> => {
    try {
        await prisma.$connect();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
};

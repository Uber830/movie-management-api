import bcrypt from 'bcryptjs';
import { prisma } from '@/utils/database';
import { generateToken } from '@/utils/jwt';
import type {
    CreateUserRequest,
    LoginRequest,
    AuthResponse,
    User
} from '@/types';

// Función para hashear contraseña
const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
};

// Función para verificar contraseña
const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};

// Servicio para registrar usuario
export const registerUser = async (userData: CreateUserRequest): Promise<boolean> => {
    const { email, password, name } = userData;

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new Error('User already exists with this email');
    }

    // Hashear contraseña
    const hashedPassword = await hashPassword(password);

    // Crear usuario
    await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        }
    });

    return true
};

// Servicio para login
export const loginUser = async (loginData: LoginRequest): Promise<AuthResponse> => {
    const { email, password } = loginData;

    // Buscar usuario
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new Error('Invalid credentials');
    }

    // Verificar contraseña
    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    // Generar token
    const token = await generateToken({
        userId: user.id,
        email: user.email,
    });

    // Retornar usuario sin contraseña
    const { password: _, ...userWithoutPassword } = user;

    return {
        user: userWithoutPassword,
        token,
    };
};

// Servicio para obtener usuario por ID
export const getUserById = async (userId: string): Promise<User | null> => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
            updatedAt: true,
        }
    });

    return user;
};

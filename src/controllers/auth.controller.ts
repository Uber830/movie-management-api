import { Request, Response } from 'express';
import { registerUser, loginUser } from '@/services/auth.service';
import type { CreateUserRequest, LoginRequest, ApiResponse } from '@/types';

// Controlador para registro de usuario
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const userData: CreateUserRequest = req.body;
        const userCreated = await registerUser(userData);

        const response: ApiResponse = {
            success: userCreated,
            message: 'User registered successfully. Please login to get your token.',
        };

        res.status(201).json(response);
    } catch (error) {
        const response: ApiResponse = {
            success: false,
            error: 'Registration failed',
            message: error instanceof Error ? error.message : 'Unknown error',
        };

        res.status(400).json(response);
    }
};

// Controlador para login de usuario
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const loginData: LoginRequest = req.body;
        const result = await loginUser(loginData);

        const response: ApiResponse = {
            success: true,
            data: result,
            message: 'Login successful',
        };

        res.status(200).json(response);
    } catch (error) {
        const response: ApiResponse = {
            success: false,
            error: 'Login failed',
            message: error instanceof Error ? error.message : 'Unknown error',
        };

        res.status(401).json(response);
    }
};

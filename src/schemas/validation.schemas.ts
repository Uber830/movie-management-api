import { z } from 'zod';

// Esquemas de Usuario
export const createUserSchema = z.object({
    email: z.string().min(1, 'Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().min(1, 'Name is required'),
});

export const loginSchema = z.object({
    email: z.string().min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
});

// Esquemas de Categoría
export const createCategorySchema = z.object({
    name: z.string().min(1, 'Name is required'),
});

// Esquemas de Película
export const createMovieSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    releaseDate: z.string().min(1, 'Release date is required'),
    duration: z.number().optional(),
    rating: z.number().optional(),
    categoryId: z.string().min(1, 'Category ID is required'),
});

// Esquema para marcar película como vista
export const markAsWatchedSchema = z.object({
    movieId: z.string().min(1, 'Movie ID is required'),
});

// Esquemas de filtros y paginación
export const movieFiltersSchema = z.object({
    title: z.string().optional(),
    categoryId: z.string().optional(),
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    sortBy: z.enum(['releaseDate', 'title', 'rating']).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
});

// Esquemas de parámetros de ruta
export const idParamSchema = z.object({
    id: z.string().min(1, 'ID is required'),
});

// Tipos inferidos de los esquemas
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type CreateMovieInput = z.infer<typeof createMovieSchema>;
export type MarkAsWatchedInput = z.infer<typeof markAsWatchedSchema>;
export type MovieFiltersInput = z.infer<typeof movieFiltersSchema>;
export type IdParamInput = z.infer<typeof idParamSchema>;

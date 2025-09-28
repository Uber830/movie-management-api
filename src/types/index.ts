import { Request } from 'express';

// Base types
export interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

// User types
export interface User extends BaseEntity {
    email: string;
    name: string;
    watchedMovies?: WatchedMovie[];
}

export interface CreateUserRequest {
    email: string;
    password: string;
    name: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: Omit<User, 'watchedMovies'>;
    token: string;
}

// Category types
export interface Category extends BaseEntity {
    name: string;
    description?: string | null;
    movies?: Movie[];
}

export interface CreateCategoryRequest {
    name: string;
}

// Movie types
export interface Movie extends BaseEntity {
    title: string;
    description?: string | null;
    releaseDate: Date;
    duration?: number | null;
    rating?: number | null;
    categoryId: string;
    category?: Category;
    watchedMovies?: WatchedMovie[];
}

export interface CreateMovieRequest {
    title: string;
    description?: string;
    releaseDate: string;
    duration?: number;
    rating?: number;
    categoryId: string;
}

export interface UpdateMovieRequest extends Partial<CreateMovieRequest> {
    id: string;
}

// Watched movie types
export interface WatchedMovie extends BaseEntity {
    watchedAt: Date;
    userId: string;
    movieId: string;
    user?: User;
    movie?: Movie;
}

export interface MarkAsWatchedRequest {
    movieId: string;
}

// Movie filters and pagination types
export interface MovieFilters {
    title?: string;
    categoryId?: string;
    page?: number;
    limit?: number;
    sortBy?: 'releaseDate' | 'title' | 'rating';
    sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// API response types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

// JWT types
export interface JwtPayload {
    userId: string;
    email: string;
    iat?: number;
    exp?: number;
}

// Middleware types
export interface AuthenticatedRequest extends Request {
    user?: User;
}

// New release movie types
export interface NewReleaseMovie extends Movie {
    isNewRelease: boolean;
}

// User with watched movies types
export interface UserWithWatchedMovies extends User {
    watchedMovies: (WatchedMovie & { movie: Movie })[];
}

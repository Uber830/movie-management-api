import type { PaginatedResponse } from '@/types';

// Función para calcular información de paginación
export const calculatePagination = (
    page: number,
    limit: number,
    total: number
): PaginatedResponse<any>['pagination'] => {
    const totalPages = Math.ceil(total / limit);
    const currentPage = Math.max(1, Math.min(page, totalPages));

    return {
        page: currentPage,
        limit,
        total,
        totalPages,
    };
};

// Función para crear respuesta paginada
export const createPaginatedResponse = <T>(
    data: T[],
    page: number,
    limit: number,
    total: number
): PaginatedResponse<T> => {
    return {
        data,
        pagination: calculatePagination(page, limit, total),
    };
};

// Función para validar parámetros de paginación
export const validatePaginationParams = (page?: number, limit?: number) => {
    const validPage = Math.max(1, page || 1);
    const validLimit = Math.min(Math.max(1, limit || 10), 15); // Máximo 15 items por página

    return {
        page: validPage,
        limit: validLimit,
        skip: (validPage - 1) * validLimit,
    };
};

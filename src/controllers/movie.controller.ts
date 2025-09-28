import { Request, Response } from 'express';
import {
    createMovie,
    getMovieById,
    updateMovie,
    deleteMovie,
    getMovies,
    getNewReleases,
    markMovieAsWatched,
    getUsersWithWatchedMovies
} from '@/services/movie.service';
import type {
    CreateMovieRequest,
    UpdateMovieRequest,
    MovieFilters,
    MarkAsWatchedRequest,
    ApiResponse,
    AuthenticatedRequest
} from '@/types';

// Create movie
export const createMovieController = async (req: Request, res: Response): Promise<void> => {
    try {
        const movieData: CreateMovieRequest = req.body;
        const movie = await createMovie(movieData);

        const response: ApiResponse = {
            success: true,
            data: movie,
            message: 'Movie created successfully',
        };

        res.status(201).json(response);
    } catch (error) {
        const response: ApiResponse = {
            success: false,
            error: 'Failed to create movie',
            message: error instanceof Error ? error.message : 'Unknown error',
        };

        res.status(400).json(response);
    }
};

// Get movie by id
export const getMovieByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const movie = await getMovieById(id);

        if (!movie) {
            const response: ApiResponse = {
                success: false,
                error: 'Movie not found',
                message: 'Movie with the specified ID does not exist',
            };
            res.status(404).json(response);
            return;
        }

        const response: ApiResponse = {
            success: true,
            data: movie,
        };

        res.status(200).json(response);
    } catch (error) {
        const response: ApiResponse = {
            success: false,
            error: 'Failed to get movie',
            message: error instanceof Error ? error.message : 'Unknown error',
        };

        res.status(500).json(response);
    }
};

// Update movie
export const updateMovieController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updateData: UpdateMovieRequest = { ...req.body, id };
        const movie = await updateMovie(updateData);

        const response: ApiResponse = {
            success: true,
            data: movie,
            message: 'Movie updated successfully',
        };

        res.status(200).json(response);
    } catch (error) {
        const response: ApiResponse = {
            success: false,
            error: 'Failed to update movie',
            message: error instanceof Error ? error.message : 'Unknown error',
        };

        res.status(400).json(response);
    }
};

// Delete movie
export const deleteMovieController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await deleteMovie(id);

        const response: ApiResponse = {
            success: true,
            message: 'Movie deleted successfully',
        };

        res.status(200).json(response);
    } catch (error) {
        const response: ApiResponse = {
            success: false,
            error: 'Failed to delete movie',
            message: error instanceof Error ? error.message : 'Unknown error',
        };

        res.status(400).json(response);
    }
};

// Get movies with filters
export const getMoviesController = async (req: Request, res: Response): Promise<void> => {
    try {
        const filters: MovieFilters = {
            title: req.query.title as string,
            categoryId: req.query.categoryId as string,
            page: req.query.page ? parseInt(req.query.page as string) : undefined,
            limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
            sortBy: req.query.sortBy as 'releaseDate' | 'title' | 'rating',
            sortOrder: req.query.sortOrder as 'asc' | 'desc',
        };

        const result = await getMovies(filters);

        const response: ApiResponse = {
            success: true,
            data: result,
        };

        res.status(200).json(response);
    } catch (error) {
        const response: ApiResponse = {
            success: false,
            error: 'Failed to get movies',
            message: error instanceof Error ? error.message : 'Unknown error',
        };

        res.status(500).json(response);
    }
};

// Get new releases
export const getNewReleasesController = async (req: Request, res: Response): Promise<void> => {
    try {
        const newReleases = await getNewReleases();

        const response: ApiResponse = {
            success: true,
            data: newReleases,
        };

        res.status(200).json(response);
    } catch (error) {
        const response: ApiResponse = {
            success: false,
            error: 'Failed to get new releases',
            message: error instanceof Error ? error.message : 'Unknown error',
        };

        res.status(500).json(response);
    }
};

// Mark movie as watched
export const markMovieAsWatchedController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { movieId } = req.body as MarkAsWatchedRequest;
        const userId = req.user?.id as string;

        await markMovieAsWatched(userId, movieId);

        const response: ApiResponse = {
            success: true,
            message: 'Movie marked as watched',
        };

        res.status(200).json(response);
    } catch (error) {
        const response: ApiResponse = {
            success: false,
            error: 'Failed to mark movie as watched',
            message: error instanceof Error ? error.message : 'Unknown error',
        };

        res.status(400).json(response);
    }
};

// Get users with watched movies
export const getUsersWithWatchedMoviesController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id as string;
        const users = await getUsersWithWatchedMovies(userId);

        const response: ApiResponse = {
            success: true,
            data: users,
        };

        res.status(200).json(response);
    } catch (error) {
        const response: ApiResponse = {
            success: false,
            error: 'Failed to get users with watched movies',
            message: error instanceof Error ? error.message : 'Unknown error',
        };

        res.status(500).json(response);
    }
};

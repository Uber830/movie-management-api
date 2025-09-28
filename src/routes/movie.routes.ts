import { Router } from 'express';
import {
    createMovieController,
    getMovieByIdController,
    updateMovieController,
    deleteMovieController,
    getMoviesController,
    getNewReleasesController,
    markMovieAsWatchedController,
    getUsersWithWatchedMoviesController,
} from '@/controllers/movie.controller';
import { authenticateToken } from '@/middleware/auth.middleware';
import {
    validateMovieData,
    validateIdParam,
    validateMovieFilters,
    validateMarkAsWatched
} from '@/middleware/validation.middleware';

const router = Router();

// Middleware to authenticate token
router.use(authenticateToken);

// Get new releases
router.get('/new-releases', getNewReleasesController);

// Get users with watched movies
router.get('/users-watched', getUsersWithWatchedMoviesController);

// Mark movie as watched
router.post('/watch', validateMarkAsWatched, markMovieAsWatchedController);

// Get all movies with filters and create a new movie
router.route('/')
    .get(validateMovieFilters, getMoviesController)
    .post(validateMovieData, createMovieController);

// Get movie by id, update movie and delete movie
router.route('/:id')
    .all(validateIdParam)
    .get(getMovieByIdController)
    .put(validateMovieData, updateMovieController)
    .delete(deleteMovieController);

export default router;

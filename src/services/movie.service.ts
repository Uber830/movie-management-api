import { prisma } from '@/utils/database';
import type {
    CreateMovieRequest,
    UpdateMovieRequest,
    Movie,
    MovieFilters,
    PaginatedResponse,
    NewReleaseMovie
} from '@/types';
import { createPaginatedResponse, validatePaginationParams } from '@/utils/pagination';

// Create movie
export const createMovie = async (movieData: CreateMovieRequest): Promise<Movie> => {
    const { title, description, releaseDate, duration, rating, categoryId } = movieData;

    // Verify if the category exists
    const category = await prisma.category.findUnique({
        where: { id: categoryId }
    });

    if (!category) {
        throw new Error('Category not found');
    }

    // Create movie
    const movie = await prisma.movie.create({
        data: {
            title,
            description,
            releaseDate: new Date(releaseDate),
            duration,
            rating,
            categoryId,
        },
        include: {
            category: true,
        }
    });

    return movie;
};

// Get movie by id
export const getMovieById = async (movieId: string): Promise<Movie | null> => {
    const movie = await prisma.movie.findUnique({
        where: { id: movieId },
        include: {
            category: true,
        }
    });

    return movie;
};

// Update movie
export const updateMovie = async (movieData: UpdateMovieRequest): Promise<Movie> => {
    const { id, ...updateData } = movieData;

    // Verify if the movie exists
    const existingMovie = await prisma.movie.findUnique({
        where: { id }
    });

    if (!existingMovie) {
        throw new Error('Movie not found');
    }

    // If the category is updated, verify if it exists
    if (updateData.categoryId) {
        const category = await prisma.category.findUnique({
            where: { id: updateData.categoryId }
        });

        if (!category) {
            throw new Error('Category not found');
        }
    }

    // Update movie
    const movie = await prisma.movie.update({
        where: { id },
        data: {
            ...updateData,
            releaseDate: updateData.releaseDate ? new Date(updateData.releaseDate) : undefined,
        },
        include: {
            category: true,
        }
    });

    return movie;
};

// Delete movie
export const deleteMovie = async (movieId: string): Promise<void> => {
    const movie = await prisma.movie.findUnique({
        where: { id: movieId }
    });

    if (!movie) {
        throw new Error('Movie not found');
    }

    await prisma.movie.delete({
        where: { id: movieId }
    });
};

// Get movies with filters
export const getMovies = async (filters: MovieFilters): Promise<PaginatedResponse<Movie>> => {
    const { page, limit, skip } = validatePaginationParams(filters.page, filters.limit);
    const { title, categoryId, sortBy = 'releaseDate', sortOrder = 'desc' } = filters;

    // Build search filters
    const whereClause: any = {};

    if (title) {
        whereClause.title = {
            contains: title,
            mode: 'insensitive',
        };
    }

    if (categoryId) {
        whereClause.categoryId = categoryId;
    }

    // Build sorting
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Get movies
    const [movies, total] = await Promise.all([
        prisma.movie.findMany({
            where: whereClause,
            include: {
                category: true,
            },
            orderBy,
            skip,
            take: limit,
        }),
        prisma.movie.count({
            where: whereClause,
        })
    ]);

    return createPaginatedResponse(movies, page, limit, total);
};

// Get new releases (movies < 3 weeks)
export const getNewReleases = async (): Promise<NewReleaseMovie[]> => {
    const threeWeeksAgo = new Date();
    threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);

    const movies = await prisma.movie.findMany({
        where: {
            releaseDate: {
                gte: threeWeeksAgo,
            }
        },
        include: {
            category: true,
        },
        orderBy: {
            releaseDate: 'desc',
        }
    });

    return movies.map(movie => ({
        ...movie,
        isNewRelease: true,
    }));
};

// Mark movie as watched
export const markMovieAsWatched = async (userId: string, movieId: string): Promise<void> => {
    // Verify if the movie exists
    const movie = await prisma.movie.findUnique({
        where: { id: movieId }
    });

    if (!movie) {
        throw new Error('Movie not found');
    }

    // Create or update watched movie record
    await prisma.watchedMovie.upsert({
        where: {
            userId_movieId: {
                userId,
                movieId,
            }
        },
        update: {
            watchedAt: new Date(),
        },
        create: {
            userId,
            movieId,
        }
    });
};

// Get users with watched movies
export const getUsersWithWatchedMovies = async (userId: string): Promise<any[]> => {
    const users = await prisma.user.findMany({
        where: {
            id: userId
        },
        include: {
            watchedMovies: {
                include: {
                    movie: {
                        include: {
                            category: true,
                        }
                    }
                },
                orderBy: {
                    watchedAt: 'desc',
                }
            }
        },
        orderBy: {
            name: 'asc',
        }
    });

    return users;
};

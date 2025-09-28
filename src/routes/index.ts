import { Router } from 'express';
import authRoutes from './auth.routes';
import movieRoutes from './movie.routes';
import categoryRoutes from './category.routes';

const router = Router();

// Rutas de autenticación
router.use('/auth', authRoutes);

// Rutas de películas
router.use('/movies', movieRoutes);

// Rutas de categorías
router.use('/categories', categoryRoutes);

export default router;

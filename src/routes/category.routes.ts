import { Router } from 'express';
import {
    createCategoryController,
    getAllCategoriesController,
    getCategoryByIdController,
    updateCategoryController,
    deleteCategoryController,
} from '@/controllers/category.controller';
import { authenticateToken } from '@/middleware/auth.middleware';
import { validateCategoryData, validateIdParam } from '@/middleware/validation.middleware';

const router = Router();

/**
 * Routes for category management
 * @module categories/category.routes
 * @category Routes
 */

// Middleware to authenticate token
router.use(authenticateToken);

// Get all categories and create a new category
router
    .route('/')
    .get(getAllCategoriesController)
    .post(validateCategoryData, createCategoryController);

// Get a category by id, update a category and delete a category
router
    .route('/:id')
    .all(validateIdParam)
    .get(getCategoryByIdController)
    .put(validateCategoryData, updateCategoryController)
    .delete(deleteCategoryController);

export default router;

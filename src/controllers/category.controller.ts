import { Request, Response } from 'express';
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from '@/services/category.service';
import type { CreateCategoryRequest, ApiResponse } from '@/types';

// Create category
export const createCategoryController = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryData: CreateCategoryRequest = req.body;
        const category = await createCategory(categoryData);

        const response: ApiResponse = {
            success: true,
            data: category,
            message: 'Category created successfully',
        };

        res.status(201).json(response);
    } catch (error) {
        const response: ApiResponse = {
            success: false,
            error: 'Failed to create category',
            message: error instanceof Error ? error.message : 'Unknown error',
        };

        res.status(400).json(response);
    }
};

// Get all categories
export const getAllCategoriesController = async (_: Request, res: Response): Promise<void> => {
    try {
        const categories = await getAllCategories();

        const response: ApiResponse = {
            success: true,
            data: categories,
        };

        res.status(200).json(response);
    } catch (error) {
        const response: ApiResponse = {
            success: false,
            error: 'Failed to get categories',
            message: error instanceof Error ? error.message : 'Unknown error',
        };

        res.status(500).json(response);
    }
};

// Get category by id
export const getCategoryByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const category = await getCategoryById(id);

        if (!category) {
            const response: ApiResponse = {
                success: false,
                error: 'Category not found',
                message: 'Category with the specified ID does not exist',
            };
            res.status(404).json(response);
            return;
        }

        const response: ApiResponse = {
            success: true,
            data: category,
        };

        res.status(200).json(response);
    } catch (error) {
        const response: ApiResponse = {
            success: false,
            error: 'Failed to get category',
            message: error instanceof Error ? error.message : 'Unknown error',
        };

        res.status(500).json(response);
    }
};

// Update category
export const updateCategoryController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updateData: Partial<CreateCategoryRequest> = req.body;
        const category = await updateCategory(id, updateData);

        const response: ApiResponse = {
            success: true,
            data: category,
            message: 'Category updated successfully',
        };

        res.status(200).json(response);
    } catch (error) {
        const response: ApiResponse = {
            success: false,
            error: 'Failed to update category',
            message: error instanceof Error ? error.message : 'Unknown error',
        };

        res.status(400).json(response);
    }
};

// Delete category
export const deleteCategoryController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await deleteCategory(id);

        const response: ApiResponse = {
            success: true,
            message: 'Category deleted successfully',
        };

        res.status(200).json(response);
    } catch (error) {
        const response: ApiResponse = {
            success: false,
            error: 'Failed to delete category',
            message: error instanceof Error ? error.message : 'Unknown error',
        };

        res.status(400).json(response);
    }
};

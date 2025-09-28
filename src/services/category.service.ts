import { prisma } from '@/utils/database';
import type { CreateCategoryRequest, Category } from '@/types';

// Create category
export const createCategory = async (categoryData: CreateCategoryRequest): Promise<Category> => {
    const { name } = categoryData;

    // Verify if the category already exists
    const existingCategory = await prisma.category.findUnique({
        where: { name }
    });

    if (existingCategory) {
        throw new Error('Category already exists');
    }

    // Create category
    const category = await prisma.category.create({
        data: { name },
    });

    return category;
};

// Get all categories
export const getAllCategories = async (): Promise<Category[]> => {
    const categories = await prisma.category.findMany({
        orderBy: {
            name: 'asc',
        }
    });

    return categories;
};

// Get category by id
export const getCategoryById = async (categoryId: string): Promise<Category | null> => {
    const category = await prisma.category.findUnique({
        where: { id: categoryId }
    });

    return category;
};

// Update category
export const updateCategory = async (categoryId: string, updateData: Partial<CreateCategoryRequest>): Promise<Category> => {
    // Verify if the category exists
    const existingCategory = await prisma.category.findUnique({
        where: { id: categoryId }
    });

    if (!existingCategory) {
        throw new Error('Category not found');
    }

    // Update category
    const category = await prisma.category.update({
        where: { id: categoryId },
        data: updateData
    });

    return category;
};

// Delete category
export const deleteCategory = async (categoryId: string): Promise<void> => {
    // Verify if the category exists
    const category = await prisma.category.findUnique({
        where: { id: categoryId }
    });

    if (!category) {
        throw new Error('Category not found');
    }

    // Verify if there are movies associated
    const moviesCount = await prisma.movie.count({
        where: { categoryId }
    });

    if (moviesCount > 0) {
        throw new Error('Cannot delete category with associated movies');
    }

    // Delete category
    await prisma.category.delete({
        where: { id: categoryId }
    });
};

import { Category } from '../models/category';
import { sequelize } from '../config/database.config';

export async function createCategory(categoryData: Partial<Category>): Promise<Category> {
  const category = await Category.create(categoryData);
  return category;
}

export async function getAllCategories(): Promise<Category[]> {
  const categories = await Category.findAll();
  return categories;
}

export async function getCategoryById(id: number): Promise<Category | null> {
  const category = await Category.findByPk(id);
  return category;
}

export async function getCategoryByCode(categoryCode: string): Promise<Category | null> {
  const category = await Category.findOne({ where: { code: categoryCode } });
  return category;
}

export async function updateCategory(id: number, categoryData: Partial<Category>): Promise<Category | null> {
  const category = await Category.findByPk(id);

  if (!category) {
    return null;
  }
  await category.update(categoryData);
  return category;
}

export async function deleteCategory(id: number): Promise<void> {
  await Category.destroy({ where: { id } });
}

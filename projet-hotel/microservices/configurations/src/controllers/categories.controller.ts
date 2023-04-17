import { Request, Response } from 'express';
import { getAllCategories, createCategory, getCategoryById, getCategoryByCode as serviceGetCategoryByCode, updateCategory, deleteCategory as serviceDeleteCategory } from '../../database/services/category.service';

export async function getCategories(req: Request, res: Response): Promise<void> {
  console.log("Microservice : Category : GET ALL CATEGORIES")
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getCategory(req: Request, res: Response): Promise<void> {
  console.log("Microservice : Category : GET CATEGORY BY ID")
  const categoryId = Number(req.params.id);

  try {
    const category = await getCategoryById(categoryId);

    if (!category) {
      res.status(404).json({ error: 'Category introuvable' });
      return;
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getCategoryByCode(req: Request, res: Response): Promise<void> {
  console.log("Microservice : Category : GET CATEGORY BY CODE")
  const categoryCode = req.params.code;

  try {
    const category = await serviceGetCategoryByCode(categoryCode);

    if (!category) {
      res.status(404).json({ error: 'Category introuvable' });
      return;
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function postCategory(req: Request, res: Response): Promise<void> {
  console.log("Microservice : Category : POST CATEGORY")
  try {
    const categoryData = req.body;
    const newCategory = await createCategory(categoryData);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function putCategory(req: Request, res: Response): Promise<void> {
  console.log("Microservice : Category : UPDATE CATEGORY")
  
  const categoryId = Number(req.params.id);
  const categoryData = req.body;

  try {
    const updatedCategory = await updateCategory(categoryId, categoryData);

    if (!updatedCategory) {
      res.status(404).json({ error: 'Category introuvable' });
      return;
    }

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteCategory(req: Request, res: Response): Promise<void> {
  console.log("Microservice : Category : DELETE CATEGORY")
  
  const categoryId = Number(req.params.id);

  try {
    await serviceDeleteCategory(categoryId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
import { Request, Response } from 'express';
import { getAllCategories, createCategory, getCategoryById, updateCategory, deleteCategory as serviceDeleteCategory } from '../../../database/src/services/category.service';

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
import * as express from 'express';
import { getCategories, getCategory, postCategory, putCategory, deleteCategory } from '../controllers/categories.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const categoryRoutes = express.Router();

categoryRoutes.get('/', authMiddleware, getCategories);
categoryRoutes.get('/:id', authMiddleware, getCategory);
categoryRoutes.post('/', authMiddleware, postCategory);
categoryRoutes.put('/:id', authMiddleware, putCategory);
categoryRoutes.delete('/:id', authMiddleware, deleteCategory);

export { categoryRoutes };
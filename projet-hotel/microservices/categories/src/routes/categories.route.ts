import * as express from 'express';
import { getCategories, getCategory, postCategory, putCategory, deleteCategory } from '../controllers/categories.controller';
import { authUser, authAdmin } from '../middlewares/auth.middleware';

const categoryRoutes = express.Router();

categoryRoutes.get('/', authUser, getCategories);
categoryRoutes.get('/:id', authUser, getCategory);
categoryRoutes.post('/', authAdmin, postCategory);
categoryRoutes.put('/:id', authAdmin, putCategory);
categoryRoutes.delete('/:id', authAdmin, deleteCategory);

export { categoryRoutes };
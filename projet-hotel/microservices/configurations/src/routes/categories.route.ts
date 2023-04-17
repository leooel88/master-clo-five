import * as express from 'express';
import { getCategories, getCategory, getCategoryByCode, postCategory, putCategory, deleteCategory } from '../controllers/categories.controller';
import { authUser, authAdmin } from '../middlewares/auth.middleware';

const categoryRoutes = express.Router();

categoryRoutes.get('/', authUser, getCategories);
categoryRoutes.get('/:id', authUser, getCategory);
categoryRoutes.get('/code/:code', authUser, getCategoryByCode);
categoryRoutes.post('/', authAdmin, postCategory);
categoryRoutes.put('/:id', authAdmin, putCategory);
categoryRoutes.delete('/:id', authAdmin, deleteCategory);

export { categoryRoutes };
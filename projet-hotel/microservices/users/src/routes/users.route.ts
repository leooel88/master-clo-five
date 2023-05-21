import * as express from 'express';
import { getUsers, getUser, postUser, putUser, deleteUser, getUserByUsername, authenticateUser } from '../controllers/users.controller';
import { authAdmin } from '../middlewares/auth.middleware';

const userRoutes = express.Router();

userRoutes.get('/', authAdmin, getUsers);
userRoutes.post('/', authAdmin, postUser);
userRoutes.post('/login', authenticateUser)
userRoutes.get('/:id', authAdmin, getUser);
userRoutes.get('/:username', authAdmin, getUserByUsername);
userRoutes.put('/:id', authAdmin, putUser);
userRoutes.delete('/:id', authAdmin, deleteUser);

export { userRoutes };
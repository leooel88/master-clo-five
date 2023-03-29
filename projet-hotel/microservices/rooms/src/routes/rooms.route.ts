import * as express from 'express';
import { getRooms, getRoom, postRoom, putRoom, deleteRoom } from '../controllers/rooms.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const roomRoutes = express.Router();

roomRoutes.get('/', authMiddleware, getRooms);
roomRoutes.get('/:id', authMiddleware, getRoom);
roomRoutes.post('/', authMiddleware, postRoom);
roomRoutes.put('/:id', authMiddleware, putRoom);
roomRoutes.delete('/:id', authMiddleware, deleteRoom);

export { roomRoutes };
import * as express from 'express';
import { getRooms, getRoom, postRoom, putRoom, deleteRoom } from '../controllers/rooms.controller';
import { authUser, authAdmin } from '../middlewares/auth.middleware';

const roomRoutes = express.Router();

roomRoutes.get('/', authUser, getRooms);
roomRoutes.get('/:id', authUser, getRoom);
roomRoutes.post('/', authAdmin, postRoom);
roomRoutes.put('/:id', authAdmin, putRoom);
roomRoutes.delete('/:id', authAdmin, deleteRoom);

export { roomRoutes };
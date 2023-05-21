import * as express from 'express';
import { getRooms, getRoom, getRoomsByHotel, postRoom, putRoom, deleteRoom } from '../controllers/rooms.controller';
import { authUser, authAdmin } from '../middlewares/auth.middleware';

const roomRoutes = express.Router();

roomRoutes.get('/', authUser, getRooms);
roomRoutes.post('/', authAdmin, postRoom);
roomRoutes.get('/:id', authUser, getRoom);
roomRoutes.get('/hotel/:hotelId', authUser, getRoomsByHotel);
roomRoutes.put('/:id', authAdmin, putRoom);
roomRoutes.delete('/:id', authAdmin, deleteRoom);

export { roomRoutes };
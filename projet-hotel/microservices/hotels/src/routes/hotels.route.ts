import * as express from 'express';
import { getHotels, getHotel, postHotel, putHotel, deleteHotel } from '../controllers/hotels.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const hotelRoutes = express.Router();

hotelRoutes.get('/', authMiddleware, getHotels);
hotelRoutes.get('/:id', authMiddleware, getHotel);
hotelRoutes.post('/', authMiddleware, postHotel);
hotelRoutes.put('/:id', authMiddleware, putHotel);
hotelRoutes.delete('/:id', authMiddleware, deleteHotel);

export { hotelRoutes };
import * as express from 'express';
import { getHotels, getHotel, postHotel, putHotel, deleteHotel } from '../controllers/hotels.controller';
import { authUser, authAdmin } from '../middlewares/auth.middleware';

const hotelRoutes = express.Router();

hotelRoutes.get('/', authUser, getHotels);
hotelRoutes.post('/', authAdmin, postHotel);
hotelRoutes.get('/:id', authUser, getHotel);
hotelRoutes.put('/:id', authAdmin, putHotel);
hotelRoutes.delete('/:id', authAdmin, deleteHotel);

export { hotelRoutes };
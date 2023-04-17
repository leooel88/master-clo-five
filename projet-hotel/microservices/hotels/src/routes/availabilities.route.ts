import * as express from 'express';
import { getHotelAvailability, getRoomAvailability } from '../controllers/availabilities.controller'
import { authUser, authAdmin } from '../middlewares/auth.middleware';

const availabilityRoutes = express.Router();

availabilityRoutes.get('/:hotelId', authUser, getHotelAvailability);
availabilityRoutes.post('/:roomId', authUser, getRoomAvailability);

export { availabilityRoutes };
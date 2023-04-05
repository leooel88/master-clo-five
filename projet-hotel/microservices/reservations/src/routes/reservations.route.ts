import * as express from 'express';
import { getReservations, getReservation, postReservation, putReservation, deleteReservation, getReservationByUserFullName } from '../controllers/reservations.controller';
import { authUser, authAdmin } from '../middlewares/auth.middleware';

const reservationRoutes = express.Router();

reservationRoutes.get('/', authUser, getReservations);
reservationRoutes.get('/:id', authUser, getReservation);
reservationRoutes.get('/userFullName/:userFullName', authUser, getReservationByUserFullName);
reservationRoutes.post('/', authAdmin, postReservation);
reservationRoutes.put('/:id', authAdmin, putReservation);
reservationRoutes.delete('/:id', authAdmin, deleteReservation);

export { reservationRoutes };
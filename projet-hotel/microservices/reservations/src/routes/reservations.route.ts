import * as express from 'express';
import { getReservations, getReservation, postReservation, putReservation, deleteReservation, getReservationByUserFullName } from '../controllers/reservations.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const reservationRoutes = express.Router();

reservationRoutes.get('/', authMiddleware, getReservations);
reservationRoutes.get('/:id', authMiddleware, getReservation);
reservationRoutes.get('/userFullName/:userFullName', authMiddleware, getReservationByUserFullName);
reservationRoutes.post('/', authMiddleware, postReservation);
reservationRoutes.put('/:id', authMiddleware, putReservation);
reservationRoutes.delete('/:id', authMiddleware, deleteReservation);

export { reservationRoutes };
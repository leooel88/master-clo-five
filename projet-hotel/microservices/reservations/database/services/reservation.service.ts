import { Reservation } from '../models/reservation';
import { sequelize } from '../config/database.config';

export async function createReservation(reservationData: Partial<Reservation>): Promise<Reservation> {
  const reservation = await Reservation.create(reservationData);
  return reservation;
}

export async function getAllReservations(): Promise<Reservation[]> {
  const reservations = await Reservation.findAll();
  return reservations;
}

export async function getReservationById(id: number): Promise<Reservation | null> {
  const reservation = await Reservation.findByPk(id);
  return reservation;
}

export async function getReservationByUserFullName(userFullName: string): Promise<Reservation | null> {
  const reservation = await Reservation.findOne({ where : { userFullName: userFullName } });
  return reservation;
}

export async function updateReservation(id: number, reservationData: Partial<Reservation>): Promise<Reservation | null> {
  const reservation = await Reservation.findByPk(id);

  if (!reservation) {
    return null;
  }
  await reservation.update(reservationData);
  return reservation;
}

export async function deleteReservation(id: number): Promise<void> {
  await Reservation.destroy({ where: { id } });
}

import { Request, Response } from 'express';
import { getAllRooms, getRoomByHotelId } from '../../database/services/room.service'
import { getHotelById } from '../../database/services/hotel.service'
import { getReservationsByHotelIdAndPeriod } from '../linkers/reservations.linker'
import { AuthenticatedRequest } from '../types/types'

export async function getHotelAvailability(req: AuthenticatedRequest, res: Response): Promise<void> {
  console.log("Microservice : Availability : GET ALL AVAILABILITIES")
  const hotelId = Number(req.params.hotelId);
  console.log(req.query.periodStart)
  console.log(req.query.periodEnd)

  try {
    const periodStart = new Date(Number(req.query.periodStart as string));
    const periodEnd = new Date(Number(req.query.periodEnd as string));

    console.log(periodStart)
    console.log(periodEnd)

    const hotelData = await getHotelById(hotelId)

    if (!hotelData) {
      res.status(404).json({ error: 'Hotel introuvable' });
      return;
    }
    const reservations = await getReservationsByHotelIdAndPeriod(req, hotelId, periodStart, periodEnd)
    let rooms = await getAllRooms()
    rooms = rooms.filter(room => !reservations.some(reservation => reservation.roomId == room.id));

    res.json({ rooms })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getRoomAvailability(req: Request, res: Response): Promise<void> {
  console.log("Microservice : Availability : GET ROOM AVAILABILITY")
  try {
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

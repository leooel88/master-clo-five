import axios from 'axios';

import { Reservation, AuthenticatedRequest } from '../types/types'

const {
  RESERVATION_MICROSERVICE_URL
} = process.env

const reservationService = axios.create({
  baseURL: `${RESERVATION_MICROSERVICE_URL}`
})

export async function getReservationsByHotelIdAndPeriod(req: AuthenticatedRequest, hotelId: number, periodStart: Date, periodEnd: Date): Promise<Reservation[] | null> {
  try {
    let headers = { authorization: req.headers.authorization };
    let response = await reservationService.get(`/reservations/hotelavailability/${hotelId}/${periodStart.getTime()}/${periodEnd.getTime()}`, { headers })
    return response.data.reservations
  } catch (err) {
    throw err
  }
}
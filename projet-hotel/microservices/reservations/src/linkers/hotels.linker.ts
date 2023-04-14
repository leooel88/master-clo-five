import axios from 'axios';
import { Room, AuthenticatedRequest } from '../types/types'

const {
  HOTEL_MICROSERVICE_URL
} = process.env

const hotelService = axios.create({
  baseURL: `${HOTEL_MICROSERVICE_URL}`
})

export async function getRoomById(req: AuthenticatedRequest, roomId: number): Promise<Room | null> {
  try {
    let headers = { authorization: req.headers.authorization };
    let response = await hotelService.get(`/rooms/${roomId}`, { headers })
    return response.data
  } catch (err) {
    throw err
  }
}
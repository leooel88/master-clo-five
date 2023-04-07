import { Room } from '../types/types'
import axios from 'axios';

const {
  HOTEL_MICROSERVICE_URL
} = process.env

const hotelService = axios.create({
  baseURL: `${HOTEL_MICROSERVICE_URL}`
})

export async function getRoomById(roomId: number): Promise<Room | null> {
  return await hotelService.get(`/rooms/${roomId}`)
}
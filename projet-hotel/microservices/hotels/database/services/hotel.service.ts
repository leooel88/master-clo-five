import { Hotel } from '../models/hotel';
import { sequelize } from '../config/database.config';

export async function createHotel(hotelData: Partial<Hotel>): Promise<Hotel> {
  const hotel = await Hotel.create(hotelData);
  return hotel;
}

export async function getAllHotels(): Promise<Hotel[]> {
  const hotels = await Hotel.findAll();
  return hotels;
}

export async function getHotelById(id: number): Promise<Hotel | null> {
  const hotel = await Hotel.findByPk(id);
  return hotel;
}

export async function updateHotel(id: number, hotelData: Partial<Hotel>): Promise<Hotel | null> {
  const hotel = await Hotel.findByPk(id);

  if (!hotel) {
    return null;
  }
  await hotel.update(hotelData);
  return hotel;
}

export async function deleteHotel(id: number): Promise<void> {
  await Hotel.destroy({ where: { id } });
}

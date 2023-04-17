import { Room } from '../models/room';
import { sequelize } from '../config/database.config';

export async function createRoom(roomData: Partial<Room>): Promise<Room> {
  const room = await Room.create(roomData);
  return room;
}

export async function getAllRooms(): Promise<Room[]> {
  const rooms = await Room.findAll();
  return rooms;
}

export async function getRoomById(id: number): Promise<Room | null> {
  const room = await Room.findByPk(id);
  return room;
}

export async function getRoomByHotelId(hotelId: number): Promise<Room[] | null> {
  const rooms = await Room.findAll({ where: { hotelId: hotelId } });
  return rooms;
}

export async function updateRoom(id: number, roomData: Partial<Room>): Promise<Room | null> {
  const room = await Room.findByPk(id);

  if (!room) {
    return null;
  }
  await room.update(roomData);
  return room;
}

export async function deleteRoom(id: number): Promise<void> {
  await Room.destroy({ where: { id } });
}

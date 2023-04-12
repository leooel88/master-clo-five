import { Request, Response } from 'express';
import { getAllRooms, createRoom, getRoomById, updateRoom, deleteRoom as serviceDeleteRoom } from '../../database/services/room.service';

export async function getRooms(req: Request, res: Response): Promise<void> {
  console.log("Microservice : Room : GET ALL ROOMS")
  try {
    const rooms = await getAllRooms();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getRoom(req: Request, res: Response): Promise<void> {
  console.log("Microservice : Room : GET ROOM BY ID")
  const roomId = Number(req.params.id);

  try {
    const room = await getRoomById(roomId);

    if (!room) {
      res.status(404).json({ error: 'Room introuvable' });
      return;
    }

    res.json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function postRoom(req: Request, res: Response): Promise<void> {
  console.log("Microservice : Room : POST ROOM")
  try {
    const roomData = req.body;
    const newRoom = await createRoom(roomData);
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function putRoom(req: Request, res: Response): Promise<void> {
  console.log("Microservice : Room : UPDATE ROOM")
  
  const roomId = Number(req.params.id);
  const roomData = req.body;

  try {
    const updatedRoom = await updateRoom(roomId, roomData);

    if (!updatedRoom) {
      res.status(404).json({ error: 'Room introuvable' });
      return;
    }

    res.json(updatedRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteRoom(req: Request, res: Response): Promise<void> {
  console.log("Microservice : Room : DELETE ROOM")
  
  const roomId = Number(req.params.id);

  try {
    await serviceDeleteRoom(roomId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
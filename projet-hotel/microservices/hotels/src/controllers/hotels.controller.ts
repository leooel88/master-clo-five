import { Request, Response } from 'express';
import { getAllHotels, createHotel, getHotelById, updateHotel, deleteHotel as serviceDeleteHotel } from '../../database/services/hotel.service';

export async function getHotels(req: Request, res: Response): Promise<void> {
  console.log("Microservice : Hotel : GET ALL HOTELS")
  try {
    const hotels = await getAllHotels();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getHotel(req: Request, res: Response): Promise<void> {
  console.log("Microservice : Hotel : GET HOTEL BY ID")
  const hotelId = Number(req.params.id);

  try {
    const hotel = await getHotelById(hotelId);

    if (!hotel) {
      res.status(404).json({ error: 'Hotel introuvable' });
      return;
    }

    res.json(hotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function postHotel(req: Request, res: Response): Promise<void> {
  console.log("Microservice : Hotel : POST HOTEL")
  try {
    const hotelData = req.body;
    const newHotel = await createHotel(hotelData);
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function putHotel(req: Request, res: Response): Promise<void> {
  console.log("Microservice : Hotel : UPDATE HOTEL")
  
  const hotelId = Number(req.params.id);
  const hotelData = req.body;

  try {
    const updatedHotel = await updateHotel(hotelId, hotelData);

    if (!updatedHotel) {
      res.status(404).json({ error: 'Hotel introuvable' });
      return;
    }

    res.json(updatedHotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteHotel(req: Request, res: Response): Promise<void> {
  console.log("Microservice : Hotel : DELETE HOTEL")
  
  const hotelId = Number(req.params.id);

  try {
    await serviceDeleteHotel(hotelId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
import { Request, Response } from 'express';
import { getAllReservations, createReservation, getReservationById, updateReservation, deleteReservation as serviceDeleteReservation, getReservationByUserFullName as serviceGetReservationByUserFullName } from '../../../database/src/services/reservation.service';
import { getRoomById } from '../../../database/src/services/room.service';
import { getCategoryByCode } from '../../../database/src/services/category.service';

export async function getReservations(req: Request, res: Response): Promise<void> {
  console.log("Microservice : Reservation : GET ALL RESERVATIONS")
  try {
    const reservations = await getAllReservations();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getReservation(req: Request, res: Response): Promise<void> {
  console.log("Microservice : Reservation : GET RESERVATION BY ID")
  const reservationId = Number(req.params.id);

  try {
    const reservation = await getReservationById(reservationId);
    if (!reservation) {
      res.status(404).json({ error: 'Reservation introuvable' });
      return;
    }

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getReservationByUserFullName(req: Request, res: Response): Promise<void> {
  console.log("Microservice : Reservation : GET RESERVATION BY ID")
  const userFullName = req.params.userFullName;

  try {
    const reservation = await serviceGetReservationByUserFullName(userFullName);

    if (!reservation) {
      res.status(404).json({ error: 'Reservation introuvable' });
      return;
    }

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function postReservation(req: Request, res: Response): Promise<void> {
  console.log("Microservice : Reservation : POST RESERVATION")
  try {
    const reservationData = req.body;
    if (reservationData.moduledPrice || reservationData.totalPrice) {
      res.status(400).json({ error: 'Les prix sont calculés automatiquement, vous ne pouvez pas les ajouter à la requête' })
    }

    let savedReservation: any = {};
    savedReservation.userFullName = reservationData.userFullName
    savedReservation.roomId = reservationData.roomId

    const DATE_checkInDate = new Date(reservationData.checkInDate)
    const DATE_checkOutDate = new Date(reservationData.checkOutDate)

    savedReservation.checkInDate = DATE_checkInDate
    savedReservation.checkOutDate = DATE_checkOutDate
    
    const roomData = await getRoomById(reservationData.roomId)
    const categoryData = await getCategoryByCode(roomData.categoryCode)

    if (reservationData.numberPerson > categoryData.capacity) {
      res.status(400).json({ error: 'Le nombre de personne pour ce type de chambre a été dépacé' })
      return;
    }
    savedReservation.numberPerson = reservationData.numberPerson;

    savedReservation.moduledPrice = getDatesPriceForRoom(categoryData.basePrice, DATE_checkInDate, DATE_checkOutDate)
    if (savedReservation.numberPerson == 1) {
      console.log("ONLY ONE : ", (getMajoredPercentageByPersons(1) / 100) * savedReservation.moduledPrice)
      savedReservation.moduledPrice = savedReservation.moduledPrice + ((getMajoredPercentageByPersons(1) / 100) * savedReservation.moduledPrice) 
    }

    savedReservation.totalPrice = savedReservation.moduledPrice

    if (reservationData.parking && reservationData.parking == true) {
      savedReservation.parking = true
      savedReservation.totalPrice += getParkingPrice()
    } else {
      savedReservation.parking = false
    }

    if (reservationData.kidBed && reservationData.kidBed == true) {
      savedReservation.kidBed = true
      savedReservation.totalPrice += getKidBedPrice()
    } else {
      savedReservation.kidBed = false
    }

    if (reservationData.romancePack && reservationData.romancePack == true) {
      if (checkPackRomanceValide(DATE_checkInDate)) {
        res.status(400).json({ error: "Le pack romance doit être réservé au moins deux jours en avance" })
        return;
      }

      savedReservation.romancePack = true
      savedReservation.totalPrice += getRomancePackPrice()
    } else {
      savedReservation.romancePack = false
    }

    if (reservationData.breakfast && reservationData.breakfast == true) {
      savedReservation.breakfast = true
      savedReservation.totalPrice += getBreakfastPrice()
    } else {
      savedReservation.breakfast = false
    }

    const newReservation = await createReservation(savedReservation);
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function putReservation(req: Request, res: Response): Promise<void> {
  console.log("Microservice : Reservation : UPDATE RESERVATION")
  
  const reservationId = Number(req.params.id);
  const reservationData = req.body;
  let savedReservation: any = {};
  if (reservationData.moduledPrice || reservationData.totalPrice) {
    res.status(400).json({ error: 'Les prix sont calculés automatiquement, vous ne pouvez pas les ajouter à la requête' })
  }

  try {
    const currentReservation = await getReservationById(reservationId)
    if (!currentReservation) {
      res.status(404).json({ error: 'Reservation introuvable' });
      return;
    }

    if (reservationData.checkInDate != null) {
      savedReservation.checkInDate = new Date(reservationData.checkInDate)
    } else {
      savedReservation.checkInDate = new Date(currentReservation.checkInDate)
    }

    if (reservationData.checkOutDate != null) {
      savedReservation.checkOutDate = new Date(reservationData.checkOutDate)
    } else {
      savedReservation.checkOutDate = new Date(currentReservation.checkOutDate)
    }

    if (savedReservation.checkInDate.getTime() >= savedReservation.checkOutDate.getTime()) {
      res.status(400).json({ error: 'Check in and check out dates are wrong (check in date canno\'t be superior or equal to check out date)' });
      return;
    }

    if (reservationData.roomId != null && reservationData.roomId != currentReservation.roomId) {
      savedReservation.roomId = reservationData.roomId
      const room = await getRoomById(savedReservation.roomId)
      const category = await getCategoryByCode(room.categoryCode)
      savedReservation.moduledPrice = getDatesPriceForRoom(category.basePrice, savedReservation.checkInDate, savedReservation.checkOutDate)
    } else {
      const room = await getRoomById(currentReservation.roomId)
      const category = await getCategoryByCode(room.categoryCode)
      savedReservation.moduledPrice = getDatesPriceForRoom(category.basePrice, savedReservation.checkInDate, savedReservation.checkOutDate)
      console.log("AFTER TIME CARE : ", savedReservation.moduledPrice)
    }
    
    if (reservationData.numberPerson != null && reservationData.numberPerson != currentReservation.numberPerson) {
      savedReservation.numberPerson = reservationData.numberPerson
      if (savedReservation.numberPerson == 1) {
        console.log("ONLY ONE : ", (getMajoredPercentageByPersons(1) / 100) * savedReservation.moduledPrice)
        savedReservation.moduledPrice = savedReservation.moduledPrice + ((getMajoredPercentageByPersons(1) / 100) * savedReservation.moduledPrice) 
      }
    } else {
      if (currentReservation.numberPerson == 1) {
        console.log("ONLY ONE : ", (getMajoredPercentageByPersons(1) / 100) * savedReservation.moduledPrice)
        savedReservation.moduledPrice = savedReservation.moduledPrice + ((getMajoredPercentageByPersons(1) / 100) * savedReservation.moduledPrice) 
      }
    }
    savedReservation.totalPrice = savedReservation.moduledPrice
    console.log("AFTER NMB PERSON : ", savedReservation.moduledPrice)

    if (reservationData.parking != null) {
      if (reservationData.parking == true) {
        savedReservation.parking = true
        savedReservation.totalPrice += getParkingPrice()
      } else {
        savedReservation.parking = false
      }
    } else if (currentReservation.parking == true) {
      savedReservation.totalPrice += getParkingPrice()
    }

    if (reservationData.kidBed != null) {
      if (reservationData.kidBed == true) {
        savedReservation.kidBed = true
        savedReservation.totalPrice += getKidBedPrice()
      } else {
        savedReservation.kidBed = false
      }
    } else if (currentReservation.kidBed == true) {
      savedReservation.totalPrice += getKidBedPrice()
    }

    if (reservationData.romancePack != null) {
      if (reservationData.romancePack == true) {
        if (checkPackRomanceValide(savedReservation.checkInDate)) {
          res.status(400).json({ error: "Le pack romance doit être réservé au moins deux jours en avance" })
          return;
        }
        savedReservation.romancePack = true
        savedReservation.totalPrice += getRomancePackPrice()
      } else {
        savedReservation.romancePack = false
      }
    } else if (currentReservation.romancePack == true) {
      savedReservation.totalPrice += getRomancePackPrice()
    }

    if (reservationData.breakfast != null) {
      if (reservationData.breakfast == true) {
        savedReservation.breakfast = true
        savedReservation.totalPrice += getBreakfastPrice()
      } else {
        savedReservation.breakfast = false
      }
    } else if (currentReservation.breakfast == true) {
      savedReservation.totalPrice += getBreakfastPrice()
    }

    console.log(savedReservation)
    const updatedReservation = await updateReservation(reservationId, savedReservation);

    if (!updatedReservation) {
      res.status(404).json({ error: 'Reservation introuvable' });
      return;
    }

    res.json(updatedReservation);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
}

export async function deleteReservation(req: Request, res: Response): Promise<void> {
  console.log("Microservice : Reservation : DELETE RESERVATION")
  
  const reservationId = Number(req.params.id);

  try {
    await serviceDeleteReservation(reservationId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function checkPackRomanceValide(date: Date): boolean {
  const current_date = new Date();
  const maximum_date = new Date(current_date.getTime() + 2 * 24 * 60 * 60 * 1000);

  return date < maximum_date;
}

function getMajoredPercentageByDate(date: Date): number {
  const jour = date.getDay();

  if (jour === 5 || jour === 6) {
    return 15;
  } else if (jour === 3 || jour === 4) {
    return -10;
  } else {
    return 0;
  }
}

function getMajoredPercentageByPersons(personNumber: number): number {
  return personNumber === 1 ? -5 : 0
}

function getDatesPriceForRoom(roomBasePrice: number, checkInDate: Date, checkOutDate: Date): number {
  let result = 0;
  let currentDate = new Date(checkInDate);

  while (currentDate < checkOutDate) {
    console.log("RESULT BEFORE : ", result)
    console.log("PERCENTAGE : ", (getMajoredPercentageByDate(currentDate) / 100))
    result += roomBasePrice + (( getMajoredPercentageByDate(currentDate) / 100) * roomBasePrice)
    currentDate.setDate(currentDate.getDate() + 1);
    console.log("RESULT AFTER : ", result)
  }

  return result;
}

function getParkingPrice(): number {
  return 25
}

function getKidBedPrice(): number {
  return 0
}

function getRomancePackPrice(): number {
  return 50
}

function getBreakfastPrice(): number {
  return 30
}
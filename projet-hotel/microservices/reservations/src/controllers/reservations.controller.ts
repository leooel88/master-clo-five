import { Request, Response } from 'express';
import { Op } from 'sequelize';

import { getAllReservations, createReservation, getReservationById, updateReservation, deleteReservation as serviceDeleteReservation, getReservationByUserFullName as serviceGetReservationByUserFullName } from '../../database/services/reservation.service';
import { getRoomById } from '../linkers/hotels.linker';
import { getCategoryByCode, getPricePoliciesByCodes } from '../linkers/configurations.linker';
import { AuthenticatedRequest } from '../types/types'
import { Reservation } from '../../database/models/reservation';

export async function getReservations(req: AuthenticatedRequest, res: Response): Promise<void> {
  console.log("Microservice : Reservation : GET ALL RESERVATIONS")
  try {
    const reservations = await getAllReservations();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getReservation(req: AuthenticatedRequest, res: Response): Promise<void> {
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

export async function getReservationByUserFullName(req: AuthenticatedRequest, res: Response): Promise<void> {
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

export async function getReservationsByHotelIdAndPeriod(req: Request, res: Response): Promise<void> {
  console.log("Microservice : Reservation : GET RESERVATION BY HOTELID & PERIOD")
  
  const hotelId = Number(req.params.hotelId);

  try {
    console.log(req.params.periodStart)
    console.log(req.params.periodStart)
    const periodStart = new Date(Number(req.params.periodStart));
    const periodEnd = new Date(Number(req.params.periodEnd));

    const reservations = await Reservation.findAll({
      where: {
        roomId: hotelId,
        [Op.or]: [
          {
            checkInDate: {
              [Op.between]: [periodStart, periodEnd],
            },
          },
          {
            checkOutDate: {
              [Op.between]: [periodStart, periodEnd],
            },
          },
        ],
      },
    });
    res.json({reservations})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function postReservation(req: AuthenticatedRequest, res: Response): Promise<void> {
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
    
    const roomData = await getRoomById(req, reservationData.roomId)
    if (!roomData) {
      res.status(404).json({error: 'La chambre renseigné est introuvable'})
    }

    const categoryData = await getCategoryByCode(req, roomData.categoryCode)

    if (reservationData.numberPerson > categoryData.capacity) {
      res.status(400).json({ error: 'Le nombre de personne pour ce type de chambre a été dépacé' })
      return;
    }
    savedReservation.numberPerson = reservationData.numberPerson;

    savedReservation.moduledPrice = await getDatesPriceForRoom(req, categoryData.basePrice, DATE_checkInDate, DATE_checkOutDate)
    if (savedReservation.numberPerson == 1) {
      console.log("ONLY ONE : ", (await getMajoredPercentageByPersons(req, 1) / 100) * savedReservation.moduledPrice)
      savedReservation.moduledPrice = savedReservation.moduledPrice + ((await getMajoredPercentageByPersons(req, 1) / 100) * savedReservation.moduledPrice) 
    }

    savedReservation.totalPrice = savedReservation.moduledPrice

    if (reservationData.parking && reservationData.parking == true) {
      savedReservation.parking = true
      savedReservation.totalPrice += await getParkingPrice(req)
    } else {
      savedReservation.parking = false
    }

    if (reservationData.kidBed && reservationData.kidBed == true) {
      savedReservation.kidBed = true
      savedReservation.totalPrice += await getKidBedPrice(req)
    } else {
      savedReservation.kidBed = false
    }

    if (reservationData.romancePack && reservationData.romancePack == true) {
      if (checkPackRomanceValide(DATE_checkInDate)) {
        res.status(400).json({ error: "Le pack romance doit être réservé au moins deux jours en avance" })
        return;
      }

      savedReservation.romancePack = true
      savedReservation.totalPrice += await getRomancePackPrice(req)
    } else {
      savedReservation.romancePack = false
    }

    if (reservationData.breakfast && reservationData.breakfast == true) {
      savedReservation.breakfast = true
      savedReservation.totalPrice += await getBreakfastPrice(req)
    } else {
      savedReservation.breakfast = false
    }

    const newReservation = await createReservation(savedReservation);
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function putReservation(req: AuthenticatedRequest, res: Response): Promise<void> {
  console.log("Microservice : Reservation : UPDATE RESERVATION")
  
  const reservationId = Number(req.params.id);
  const reservationData = req.body;
  let savedReservation: any = {};
  if (reservationData.userFullName && reservationData.userFullName) {
    savedReservation.userFullName = reservationData.userFullName
  }

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
      const room = await getRoomById(req, savedReservation.roomId)
      if (!room) {
        res.status(404).json({error: 'La chambre renseigné est introuvable'})
      }
      const category = await getCategoryByCode(req, room.categoryCode)
      savedReservation.moduledPrice = await getDatesPriceForRoom(req, category.basePrice, savedReservation.checkInDate, savedReservation.checkOutDate)
    } else {
      const room = await getRoomById(req, currentReservation.roomId)
      if (!room) {
        res.status(404).json({error: 'La chambre renseigné est introuvable'})
      }
      const category = await getCategoryByCode(req, room.categoryCode)
      savedReservation.moduledPrice = await getDatesPriceForRoom(req, category.basePrice, savedReservation.checkInDate, savedReservation.checkOutDate)
      console.log("AFTER TIME CARE : ", savedReservation.moduledPrice)
    }
    
    if (reservationData.numberPerson != null && reservationData.numberPerson != currentReservation.numberPerson) {
      savedReservation.numberPerson = reservationData.numberPerson
      if (savedReservation.numberPerson == 1) {
        console.log("ONLY ONE : ", (await getMajoredPercentageByPersons(req, 1) / 100) * savedReservation.moduledPrice)
        savedReservation.moduledPrice = savedReservation.moduledPrice + ((await getMajoredPercentageByPersons(req, 1) / 100) * savedReservation.moduledPrice) 
      }
    } else {
      if (currentReservation.numberPerson == 1) {
        console.log("ONLY ONE : ", (await getMajoredPercentageByPersons(req, 1) / 100) * savedReservation.moduledPrice)
        savedReservation.moduledPrice = savedReservation.moduledPrice + ((await getMajoredPercentageByPersons(req, 1) / 100) * savedReservation.moduledPrice) 
      }
    }
    savedReservation.totalPrice = savedReservation.moduledPrice
    console.log("AFTER NMB PERSON : ", savedReservation.moduledPrice)

    if (reservationData.parking != null) {
      if (reservationData.parking == true) {
        savedReservation.parking = true
        savedReservation.totalPrice += await getParkingPrice(req)
      } else {
        savedReservation.parking = false
      }
    } else if (currentReservation.parking == true) {
      savedReservation.totalPrice += await getParkingPrice(req)
    }

    if (reservationData.kidBed != null) {
      if (reservationData.kidBed == true) {
        savedReservation.kidBed = true
        savedReservation.totalPrice += await getKidBedPrice(req)
      } else {
        savedReservation.kidBed = false
      }
    } else if (currentReservation.kidBed == true) {
      savedReservation.totalPrice += await getKidBedPrice(req)
    }

    if (reservationData.romancePack != null) {
      if (reservationData.romancePack == true) {
        if (checkPackRomanceValide(savedReservation.checkInDate)) {
          res.status(400).json({ error: "Le pack romance doit être réservé au moins deux jours en avance" })
          return;
        }
        savedReservation.romancePack = true
        savedReservation.totalPrice += await getRomancePackPrice(req)
      } else {
        savedReservation.romancePack = false
      }
    } else if (currentReservation.romancePack == true) {
      savedReservation.totalPrice += await getRomancePackPrice(req)
    }

    if (reservationData.breakfast != null) {
      if (reservationData.breakfast == true) {
        savedReservation.breakfast = true
        savedReservation.totalPrice += await getBreakfastPrice(req)
      } else {
        savedReservation.breakfast = false
      }
    } else if (currentReservation.breakfast == true) {
      savedReservation.totalPrice += await getBreakfastPrice(req)
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

export async function deleteReservation(req: AuthenticatedRequest, res: Response): Promise<void> {
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

async function getMajoredPercentageByDate(req: AuthenticatedRequest, date: Date): Promise<number> {
  const jour = date.getDay();
  const pricePolicies = await getPricePoliciesByCodes(req, ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'])

  if (jour === 1) {
    return pricePolicies.find(pricePolicy => pricePolicy.code === 'D1').percentage
  } else if (jour === 2) {
    return pricePolicies.find(pricePolicy => pricePolicy.code === 'D2').percentage
  } else if (jour === 3) {
    return pricePolicies.find(pricePolicy => pricePolicy.code === 'D3').percentage
  } else if (jour === 4) {
    return pricePolicies.find(pricePolicy => pricePolicy.code === 'D4').percentage
  } else if (jour === 5) {
    return pricePolicies.find(pricePolicy => pricePolicy.code === 'D5').percentage
  } else if (jour === 6) {
    return pricePolicies.find(pricePolicy => pricePolicy.code === 'D6').percentage
  } else if (jour === 7) {
    return pricePolicies.find(pricePolicy => pricePolicy.code === 'D7').percentage
  } else {
    return 0;
  }
}

async function getMajoredPercentageByPersons(req: AuthenticatedRequest, personNumber: number): Promise<number> {
  const pricePolicies = await getPricePoliciesByCodes(req, ['P1'])
  return personNumber === 1 ? pricePolicies.find(pricePolicy => pricePolicy.code === 'P1').percentage : 0
}

async function getDatesPriceForRoom(req: AuthenticatedRequest, roomBasePrice: number, checkInDate: Date, checkOutDate: Date): Promise<number> {
  let result = 0;
  let currentDate = new Date(checkInDate);

  while (currentDate < checkOutDate) {
    console.log("RESULT BEFORE : ", result)
    console.log("PERCENTAGE : ", (await getMajoredPercentageByDate(req, currentDate) / 100))
    result += roomBasePrice + ((await getMajoredPercentageByDate(req, currentDate) / 100) * roomBasePrice)
    currentDate.setDate(currentDate.getDate() + 1);
    console.log("RESULT AFTER : ", result)
  }

  return result;
}

async function getParkingPrice(req: AuthenticatedRequest): Promise<number> {
  const pricePolicies = await getPricePoliciesByCodes(req, ['SP'])
  return pricePolicies.find(pricePolicy => pricePolicy.code === 'SP').price
}

async function getKidBedPrice(req: AuthenticatedRequest): Promise<number> {
  const pricePolicies = await getPricePoliciesByCodes(req, ['SK'])
  return pricePolicies.find(pricePolicy => pricePolicy.code === 'SK').price
}

async function getRomancePackPrice(req: AuthenticatedRequest): Promise<number> {
  const pricePolicies = await getPricePoliciesByCodes(req, ['SR'])
  return pricePolicies.find(pricePolicy => pricePolicy.code === 'SR').price
}

async function getBreakfastPrice(req: AuthenticatedRequest): Promise<number> {
  const pricePolicies = await getPricePoliciesByCodes(req, ['SB'])
  return pricePolicies.find(pricePolicy => pricePolicy.code === 'SB').price
}
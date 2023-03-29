import express = require("express");
import axios from 'axios';

const {
  GLOBAL_PORT,
  HOTEL_MICROSERVICE_URL,
  ROOM_MICROSERVICE_URL,
  RESERVATION_MICROSERVICE_URL,
  CATEGORY_MICROSERVICE_URL
} = process.env

const app = express();
app.use(express.json());

/////////////////////
// HOTELS
const hotelService = axios.create({
  baseURL: `${HOTEL_MICROSERVICE_URL}`
})

// GET ALL
app.get('/hotels', async (req, res) => {
  try {
    const headers = { authorization: req.headers.authorization };
    const response = await hotelService.get(`/hotels`, { headers });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// GET
app.get('/hotels/:id?', async (req, res) => {
  try {
    const headers = { authorization: req.headers.authorization };
    const response = await hotelService.get(`/hotels${req.params.id ? '/' + req.params.id : ''}`, { headers });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// POST
app.post('/hotels', async (req, res) => {
  try {
    const headers = { authorization: req.headers.authorization };
    const response = await hotelService.post(`/hotels`, req.body, { headers });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// PUT
app.put('/hotels/:id', async (req, res) => {
  try {
    const headers = { authorization: req.headers.authorization };
    const response = await hotelService.put(`/hotels/${req.params.id}`, req.body, { headers });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// DELETE
app.delete('/hotels/:id', async (req, res) => {
  try {
    const headers = { authorization: req.headers.authorization };
    const response = await hotelService.delete(`/hotels/${req.params.id}`, { headers });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

/////////////////////
// ROOMS
const roomService = axios.create({
  baseURL: `${ROOM_MICROSERVICE_URL}`
})

// GET ALL
app.get('/rooms', async (req, res) => {
  try {
    const headers = { authorization: req.headers.authorization };
    const response = await roomService.get(`/rooms`, { headers });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// GET
app.get('/rooms/:id?', async (req, res) => {
  try {
    const headers = { authorization: req.headers.authorization };
    const response = await roomService.get(`/rooms${req.params.id ? '/' + req.params.id : ''}`, { headers });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// POST
app.post('/rooms', async (req, res) => {
  try {
    const headers = { authorization: req.headers.authorization };
    const response = await roomService.post(`/rooms`, req.body, { headers });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// PUT
app.put('/rooms/:id', async (req, res) => {
  try {
    const headers = { authorization: req.headers.authorization };
    const response = await roomService.put(`/rooms/${req.params.id}`, req.body, { headers });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// DELETE
app.delete('/rooms/:id', async (req, res) => {
  try {
    const headers = { authorization: req.headers.authorization };
    const response = await roomService.delete(`/rooms/${req.params.id}`, { headers });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

/////////////////////
// RESERVATIONS
const reservationService = axios.create({
  baseURL: `${RESERVATION_MICROSERVICE_URL}`
})

// GET ALL
app.get('/reservations', async (req, res) => {
  try {
    const headers = { authorization: req.headers.authorization };
    const response = await reservationService.get(`/reservations`, { headers });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// GET
app.get('/reservations/:id?', async (req, res) => {
  try {
    const headers = { authorization: req.headers.authorization };
    const response = await reservationService.get(`/reservations${req.params.id ? '/' + req.params.id : ''}`, { headers });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

app.get('/reservations/userFullName/:userFullName', async (req, res) => {
  try {
    const headers = { authorization: req.headers.authorization };
    const response = await reservationService.get(`/reservations/userFullName/${req.params.userFullName}`, { headers });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// POST
app.post('/reservations', async (req, res) => {
  try {
    const headers = { authorization: req.headers.authorization };
    const response = await reservationService.post(`/reservations`, req.body, { headers });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// PUT
app.put('/reservations/:id', async (req, res) => {
  try {
    const headers = { authorization: req.headers.authorization };
    const response = await reservationService.put(`/reservations/${req.params.id}`, req.body, { headers });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// DELETE
app.delete('/reservations/:id', async (req, res) => {
  try {
    const headers = { authorization: req.headers.authorization };
    const response = await reservationService.delete(`/reservations/${req.params.id}`, { headers });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

/////////////////////
// CATEGORIES
const categoryService = axios.create({
  baseURL: `${CATEGORY_MICROSERVICE_URL}`
})

// GET ALL
app.get('/categories', async (req, res) => {
  try {
    const headers = { authorization: req.headers.authorization };
    const response = await categoryService.get(`/categories`, { headers });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// GET
app.get('/categories/:id?', async (req, res) => {
  try {
    const headers = { authorization: req.headers.authorization };
    const response = await categoryService.get(`/categories${req.params.id ? '/' + req.params.id : ''}`,{ headers });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// POST
app.post('/categories', async (req, res) => {
  try {
    const headers = { authorization: req.headers.authorization };
    const response = await categoryService.post(`/categories`, req.body, { headers });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// PUT
app.put('/categories/:id', async (req, res) => {
  try {
    const headers = { authorization: req.headers.authorization };
    const response = await categoryService.put(`/categories/${req.params.id}`, req.body, { headers });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// DELETE
app.delete('/categories/:id', async (req, res) => {
  try {
    const headers = { authorization: req.headers.authorization };
    const response = await categoryService.delete(`/categories/${req.params.id}`, { headers });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

///////////////////////

app.listen(+GLOBAL_PORT, () => {
  console.log(`Global API is running on port ${GLOBAL_PORT}`);
});
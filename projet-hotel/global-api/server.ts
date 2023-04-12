import express = require("express");
import axios from 'axios';

const {
  GLOBAL_PORT,
  HOTEL_MICROSERVICE_URL,
  RESERVATION_MICROSERVICE_URL,
  CATEGORY_MICROSERVICE_URL,
  USER_MICROSERVICE_URL
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
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await hotelService.get(`/hotels`, { headers });
    } else {
      response = await hotelService.get(`/hotels`);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// GET
app.get('/hotels/:id?', async (req, res) => {
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await hotelService.get(`/hotels${req.params.id ? '/' + req.params.id : ''}`, { headers });
    } else {
      response = await hotelService.get(`/hotels${req.params.id ? '/' + req.params.id : ''}`);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// POST
app.post('/hotels', async (req, res) => {
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await hotelService.post(`/hotels`, req.body, { headers });
    } else {
      response = await hotelService.post(`/hotels`, req.body);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// PUT
app.put('/hotels/:id', async (req, res) => {
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await hotelService.put(`/hotels/${req.params.id}`, req.body, { headers });
    } else {
      response = await hotelService.put(`/hotels/${req.params.id}`, req.body);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// DELETE
app.delete('/hotels/:id', async (req, res) => {
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await hotelService.delete(`/hotels/${req.params.id}`, { headers });
    } else {
      response = await hotelService.delete(`/hotels/${req.params.id}`);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

/////////////////////
// ROOMS

// GET ALL
app.get('/rooms', async (req, res) => {
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await hotelService.get(`/rooms`, { headers });
    } else {
      response = await hotelService.get(`/rooms`);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// GET
app.get('/rooms/:id?', async (req, res) => {
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await hotelService.get(`/rooms${req.params.id ? '/' + req.params.id : ''}`, { headers });
    } else {
      response = await hotelService.get(`/rooms${req.params.id ? '/' + req.params.id : ''}`);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// POST
app.post('/rooms', async (req, res) => {
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await hotelService.post(`/rooms`, req.body, { headers });
    } else {
      response = await hotelService.post(`/rooms`, req.body);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// PUT
app.put('/rooms/:id', async (req, res) => {
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await hotelService.put(`/rooms/${req.params.id}`, req.body, { headers });
    } else {
      response = await hotelService.put(`/rooms/${req.params.id}`, req.body);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// DELETE
app.delete('/rooms/:id', async (req, res) => {
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await hotelService.delete(`/rooms/${req.params.id}`, { headers });
    } else {
      response = await hotelService.delete(`/rooms/${req.params.id}`);
    }
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
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await reservationService.get(`/reservations`, { headers });
    } else {
      response = await reservationService.get(`/reservations`);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// GET
app.get('/reservations/:id?', async (req, res) => {
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await reservationService.get(`/reservations${req.params.id ? '/' + req.params.id : ''}`, { headers });
    } else {
      response = await reservationService.get(`/reservations${req.params.id ? '/' + req.params.id : ''}`);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

app.get('/reservations/userFullName/:userFullName', async (req, res) => {
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await reservationService.get(`/reservations/userFullName/${req.params.userFullName}`, { headers });
    } else {
      response = await reservationService.get(`/reservations/userFullName/${req.params.userFullName}`);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// POST
app.post('/reservations', async (req, res) => {
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await reservationService.post(`/reservations`, req.body, { headers });
    } else {
      response = await reservationService.post(`/reservations`, req.body);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// PUT
app.put('/reservations/:id', async (req, res) => {
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await reservationService.put(`/reservations/${req.params.id}`, req.body, { headers });
    } else {
      response = await reservationService.put(`/reservations/${req.params.id}`, req.body);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// DELETE
app.delete('/reservations/:id', async (req, res) => {
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await reservationService.delete(`/reservations/${req.params.id}`, { headers });
    } else {
      response = await reservationService.delete(`/reservations/${req.params.id}`);
    }
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
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await categoryService.get(`/categories`, { headers });
    } else {
      response = await categoryService.get(`/categories`);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// GET
app.get('/categories/:id?', async (req, res) => {
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await categoryService.get(`/categories${req.params.id ? '/' + req.params.id : ''}`,{ headers });
    } else {
      response = await categoryService.get(`/categories${req.params.id ? '/' + req.params.id : ''}`);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// POST
app.post('/categories', async (req, res) => {
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await categoryService.post(`/categories`, req.body, { headers });
    } else {
      response = await categoryService.post(`/categories`, req.body);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// PUT
app.put('/categories/:id', async (req, res) => {
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await categoryService.put(`/categories/${req.params.id}`, req.body, { headers });
    } else {
      response = await categoryService.put(`/categories/${req.params.id}`, req.body);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// DELETE
app.delete('/categories/:id', async (req, res) => {
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await categoryService.delete(`/categories/${req.params.id}`, { headers });
    } else {
      response = await categoryService.delete(`/categories/${req.params.id}`);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

/////////////////////
// USERS
const userService = axios.create({
  baseURL: `${USER_MICROSERVICE_URL}`
})

// GET ALL
app.get('/users', async (req, res) => {
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await userService.get(`/users`, { headers });
    } else {
      response = await userService.get(`/users`);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// GET
app.get('/users/:id?', async (req, res) => {
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await userService.get(`/users${req.params.id ? '/' + req.params.id : ''}`,{ headers });
    } else {
      response = await userService.get(`/users${req.params.id ? '/' + req.params.id : ''}`);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// POST
app.post('/users', async (req, res) => {
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await userService.post(`/users`, req.body, { headers });
    } else {
      response = await userService.post(`/users`, req.body);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// POST LOGIN
app.post('/users/login', async (req, res) => {
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await userService.post(`/users/login`, req.body, { headers });
    } else {
      response = await userService.post(`/users/login`, req.body);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// PUT
app.put('/users/:id', async (req, res) => {
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await userService.put(`/users/${req.params.id}`, req.body, { headers });
    } else {
      response = await userService.put(`/users/${req.params.id}`, req.body);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// DELETE
app.delete('/users/:id', async (req, res) => {
  let headers;
  let response;
  try {
    if (req.headers.authorization) {
      headers = { authorization: req.headers.authorization };
      response = await userService.delete(`/users/${req.params.id}`, { headers });
    } else {
      response = await userService.delete(`/users/${req.params.id}`);
    }
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

///////////////////////

app.listen(+GLOBAL_PORT, () => {
  console.log(`Global API is running on port ${GLOBAL_PORT}`);
});
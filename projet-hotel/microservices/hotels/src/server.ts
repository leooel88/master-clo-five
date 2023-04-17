import express = require("express");
import { hotelRoutes } from './routes/hotels.route';
import { roomRoutes } from './routes/rooms.route';
import { availabilityRoutes } from './routes/availabilities.route'

const { HOTEL_MICROSERVICE_PORT } = process.env;

const app = express();

app.use(express.json());
app.use('/hotels', hotelRoutes);
app.use('/rooms', roomRoutes);
app.use('/availabilities', availabilityRoutes);

app.listen(+HOTEL_MICROSERVICE_PORT, () => {
  console.log(`Hotels microservice is running on port ${HOTEL_MICROSERVICE_PORT}`);
});

export default app;
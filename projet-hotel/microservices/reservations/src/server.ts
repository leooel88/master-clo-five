import express = require("express");
import { reservationRoutes } from './routes/reservations.route';

const { RESERVATION_MICROSERVICE_PORT } = process.env

const app = express();

app.use(express.json());
app.use('/reservations', reservationRoutes);

app.listen(+RESERVATION_MICROSERVICE_PORT, () => {
  console.log(`Reservations microservice is running on port ${RESERVATION_MICROSERVICE_PORT}`);
});

export default app;
import express = require("express");
import { reservationRoutes } from './routes/reservations.route';

const app = express();

app.use(express.json());
app.use('/reservations', reservationRoutes);

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
  console.log(`Reservations microservice is running on port ${PORT}`);
});

export default app;
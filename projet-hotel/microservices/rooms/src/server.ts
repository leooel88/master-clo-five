import express = require("express");
import { roomRoutes } from './routes/rooms.route';

const { ROOM_MICROSERVICE_PORT } = process.env

const app = express();

app.use(express.json());
app.use('/rooms', roomRoutes);

app.listen(+ROOM_MICROSERVICE_PORT, () => {
  console.log(`Rooms microservice is running on port ${ROOM_MICROSERVICE_PORT}`);
});

export default app;
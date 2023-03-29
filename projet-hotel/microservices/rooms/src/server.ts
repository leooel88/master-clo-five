import express = require("express");
import { roomRoutes } from './routes/rooms.route';

const app = express();

app.use(express.json());
app.use('/rooms', roomRoutes);

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  console.log(`Rooms microservice is running on port ${PORT}`);
});

export default app;
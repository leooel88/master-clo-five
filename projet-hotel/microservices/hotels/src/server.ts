import express = require("express");
import { hotelRoutes } from './routes/hotels.route';

const app = express();

app.use(express.json());
app.use('/hotels', hotelRoutes);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Hotels microservice is running on port ${PORT}`);
});

export default app;
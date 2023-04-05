import express = require("express");
import { userRoutes } from './routes/users.route';

const { USER_MICROSERVICE_PORT } = process.env

const app = express();

app.use(express.json());
app.use('/users', userRoutes);

app.listen(+USER_MICROSERVICE_PORT, () => {
  console.log(`Users microservice is running on port ${USER_MICROSERVICE_PORT}`);
});

export default app;
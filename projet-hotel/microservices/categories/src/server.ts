import express = require("express");
import { categoryRoutes } from './routes/categories.route';

const { CATEGORY_MICROSERVICE_PORT } = process.env

const app = express();

app.use(express.json());
app.use('/categories', categoryRoutes);

app.listen(+CATEGORY_MICROSERVICE_PORT, () => {
  console.log(`Categories microservice is running on port ${CATEGORY_MICROSERVICE_PORT}`);
});

export default app;
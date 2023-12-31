import express = require("express");
import { categoryRoutes } from './routes/categories.route'
import { pricePolicyRoutes } from './routes/pricePolicies.route'

const { CONFIGURATION_MICROSERVICE_PORT } = process.env;

const app = express();

app.use(express.json());
app.use('/categories', categoryRoutes);
app.use('/pricePolicies', pricePolicyRoutes);

app.listen(+CONFIGURATION_MICROSERVICE_PORT, () => {
  console.log(`Configuration microservice is running on port ${CONFIGURATION_MICROSERVICE_PORT}`);
});

export default app;
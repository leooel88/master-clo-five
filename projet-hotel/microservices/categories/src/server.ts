import express = require("express");
import { categoryRoutes } from './routes/categories.route';

const app = express();

app.use(express.json());
app.use('/categories', categoryRoutes);

const PORT = process.env.PORT || 4004;

app.listen(PORT, () => {
  console.log(`Categories microservice is running on port ${PORT}`);
});

export default app;
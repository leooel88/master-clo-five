import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE_URL ||
  'mysql://application:password@localhost:3306/db_hotel',
  {
    dialect: 'mysql',
    logging: false,
  }
);

export { sequelize };
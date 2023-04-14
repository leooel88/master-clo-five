import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.CONFIGURATIONS_DATABASE_URL,
  {
    dialect: 'mysql',
    logging: false,
  }
);

export { sequelize };
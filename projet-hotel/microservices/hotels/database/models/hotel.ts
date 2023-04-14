import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.config';

export class Hotel extends Model {
  public id!: number;
  public name!: string;
  public address!: string;
  public phoneNumber!: string;
}

Hotel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'hotels',
  }
);

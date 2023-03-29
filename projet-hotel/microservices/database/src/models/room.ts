import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.config';
import { Hotel } from './hotel';
import { Category } from './category';

class Room extends Model {
  public id!: number;
  public hotelId!: number;
  public categoryCode!: string;
}

Room.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    hotelId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Hotel,
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    categoryCode: {
      type: DataTypes.STRING(2),
      allowNull: false,
      references: {
        model: Category,
        key: 'code'
      },
      onDelete: 'CASCADE'
    },
  },
  {
    sequelize,
    tableName: 'rooms',
    timestamps: false
  }
);

export { Room };
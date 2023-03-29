import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.config';
import { Room } from './room'

export class Reservation extends Model {
  public id!: number;
  public userFullName!: string;
  public roomId!: number;
  public moduledPrice!: number;
  public totalPrice!: number;
  public parking!: boolean;
  public kidBed!: boolean;
  public romancePack!: boolean;
  public breakfast!: boolean;
  public checkInDate!: Date;
  public checkOutDate!: Date;
  public numberPerson!: number;
}

Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userFullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numberPerson: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    roomId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Room,
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    moduledPrice: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    parking: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    kidBed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    romancePack: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    breakfast: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    checkInDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checkOutDate: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'reservations',
  }
);
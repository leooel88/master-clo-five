import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.config';

class PricePolicy extends Model {
  public id!: number;
  public code!: string;
  public type!: 'FIX' | 'PERCENTAGE';
  public price!: number;
  public percentage!: number; 
}

PricePolicy.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(2),
      allowNull: false,
      unique: true
    },
    type: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    percentage: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'pricePolicies',
    timestamps: false
  }
);

export { PricePolicy };
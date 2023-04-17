import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.config';

class Category extends Model {
  public id!: number;
  public code!: string;
  public name!: string;
  public capacity!: number;
  public basePrice!: number;
}

Category.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    basePrice: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'categories',
    timestamps: false
  }
);

export { Category };
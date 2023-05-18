import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.config';

class User extends Model {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public username!: string
  public password!: string;
  public role!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false
  }
);

export { User };
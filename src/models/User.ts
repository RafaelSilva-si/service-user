// ./models/User.ts

import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

class User extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public CPF!: string;
  public phone!: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CPF: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  },
);

export default User;

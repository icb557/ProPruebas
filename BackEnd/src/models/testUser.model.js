import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'

export const TestUser = sequelize.define('TestUser', {
  testCase: {
    type: DataTypes.STRING
  },
  happy: {
    type: DataTypes.BOOLEAN
  },
  nit: {
    type: DataTypes.STRING
  },
  firstName: {
    type: DataTypes.STRING
  },
  middleName: {
    type: DataTypes.STRING
  },
  lastName1: {
    type: DataTypes.STRING
  },
  lastName2: {
    type: DataTypes.STRING
  },
  birthdate: {
    type: DataTypes.DATEONLY
  },
  phoneNumber: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  userName: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  }

})

import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('ProPruebas', 'ProPruebas', '1234', {
  host: 'localhost',
  dialect: 'postgres'
})

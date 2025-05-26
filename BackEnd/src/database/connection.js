import { Sequelize } from 'sequelize'
import { config } from '../config/config.js'

export const sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.password,
  {
    host: config.database.host,
    port: config.database.port,
    dialect: 'postgres'
  }
)

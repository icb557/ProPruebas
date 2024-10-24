import { sequelize } from './database/connection.js'
import './models/person.model.js'

try {
  await sequelize.sync({ force: true })
} catch (error) {
  console.error('Error synchronizing the database', error)
}

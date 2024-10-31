import { sequelize } from './database/connection.js'
import './models/person.model.js'
import './models/testUser.model.js'
import { inserts } from './database/inserts.js'

try {
  await sequelize.sync({ force: true })
  inserts()
} catch (error) {
  console.error('Error synchronizing the database', error)
}

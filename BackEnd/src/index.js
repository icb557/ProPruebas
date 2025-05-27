import app from './app.js'
import { sequelize } from './database/connection.js'

// Import models to ensure they are registered with Sequelize before sync
import './models/person.model.js' // Add other models here if you have them

try {
  await sequelize.authenticate()
  console.log('Connection has been established successfully')

  // Sync all models
  // In development, you might use { alter: true } or { force: true } (be careful with force: true)
  // For production, consider using migrations instead of sync({ alter: true }) or sync({ force: true })
  await sequelize.sync({ alter: true })
  console.log('All models were synchronized successfully.')

  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`app running in port ${PORT}`)
  })
} catch (error) {
  console.error('Error during app startup:', error)
}

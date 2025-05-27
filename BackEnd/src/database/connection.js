import { Sequelize } from 'sequelize'
import { config } from '../config/config.js'

export const sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.password,
  {
    host: config.database.host,
    port: config.database.port,
    dialect: 'postgres',
    dialectOptions: config.env !== 'development'
      ? {
          ssl: {
            require: false,
            rejectUnauthorized: false
            // For AWS RDS and other managed databases, you might need to add the CA certificate:
            // ca: fs.readFileSync('/path/to/your/ca-certificate.pem').toString(),
          }
        }
      : {}, // No SSL options for development by default or other environments
    logging: false // Disable logging or configure as needed
  }
)

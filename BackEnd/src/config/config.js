import 'dotenv/config'

export const config = {
  env: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'ProPruebas',
    user: process.env.DB_USER || 'ProPruebas',
    password: process.env.DB_PASSWORD || '1234'
  },
  server: {
    port: process.env.PORT || 3000,
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:4200'
  },
  jwt: {
    secret: process.env.SECRET_KEY || 'juan'
  }
}

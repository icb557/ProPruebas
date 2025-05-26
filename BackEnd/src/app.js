import express from 'express'
import 'dotenv/config'
import cors from 'cors'
// import { config } from './config/config.js'
import { personRouter } from './routes/person.routes.js'

const app = express()

// cors config for production
// app.use(cors({
//   origin: config.server.corsOrigin,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }))

app.use(cors()) // --> cors config for development
app.use(express.json())

app.use(personRouter)

export default app

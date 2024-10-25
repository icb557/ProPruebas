import express from 'express'
import 'dotenv/config'
import cors from 'cors'

import { personRouter } from './routes/person.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use(personRouter)

export default app

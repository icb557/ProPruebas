import { Router } from 'express'

import { PersonController } from '../controllers/person.controller.js'
import { validateToken } from '../middleware/validateToken.js'

const personController = new PersonController()
export const personRouter = Router()

personRouter.get('/api/person', validateToken, personController.getAllPeople)
personRouter.post('/api/person', validateToken, personController.createPerson)
personRouter.get('/api/person/:nit', validateToken, personController.getPerson)
personRouter.put('/api/person/:nit', validateToken, personController.updatePerson)
personRouter.delete('/api/person/:nit', validateToken, personController.deletePerson)
personRouter.post('/api/person/login', personController.login)
personRouter.get('/api/person/report/xml', validateToken, personController.getPeopleXmlReport)

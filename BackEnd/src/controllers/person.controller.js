import bcrypt from 'bcrypt'
import { Person } from '../models/person.model.js'
import jwt from 'jsonwebtoken'
import { create } from 'xmlbuilder2'

export class PersonController {
  getAllPeople = async (req, res) => {
    try {
      const People = await Person.findAll()
      res.json(People)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  createPerson = async (req, res) => {
    try {
      const { nit, firstName, middleName, lastName1, lastName2, birthdate, phoneNumber, email } = req.body
      const person = await Person.findByPk(nit)
      if (!person) {
        const fullName = firstName + lastName1.toLowerCase() + lastName2.toLowerCase()
        const userName = fullName.charAt(0).toUpperCase() + fullName.substring(1, 7) + Math.floor(Math.random() * 10)
        const hashedPassword = await bcrypt.hash('P@ssw0rd', 12)
        const newPerson = await Person.create({
          nit,
          firstName,
          middleName,
          lastName1,
          lastName2,
          birthdate,
          phoneNumber,
          email,
          userName,
          password: hashedPassword
        })

        const { password, createdAt, updatedAt, ...personWithoutSensitiveData } = newPerson.toJSON()
        return res.status(201).json({ newPerson: personWithoutSensitiveData })
      }
      return res.status(400).json({ err: 'Account already exists' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  getPerson = async (req, res) => {
    try {
      const { nit } = req.params
      const person = await Person.findByPk(nit, {
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
      })
      if (person) {
        res.status(200).json(person)
      } else {
        res.status(404).json({ err: 'Person not found' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  deletePerson = async (req, res) => {
    try {
      const { nit } = req.params
      await Person.destroy({
        where: {
          nit
        }
      })
      res.json({ msg: 'Person deleted' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  updatePerson = async (req, res) => {
    try {
      const { nit } = req.params
      const person = await Person.findByPk(nit)
      person.set(req.body)
      await person.save()
      res.status(202).json(person)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  login = async (req, res) => {
    try {
      const { userName, password } = req.body
      const cred = await Person.findOne({
        where: {
          userName
        }
      })
      if (!cred) {
        return res.status(400).json({ err: 'User is not registered' })
      }
      const eq = await bcrypt.compare(password, cred.password)
      if (!eq) {
        return res.status(401).json({ err: 'Password incorrect' })
      }
      const token = createToken({ data: { userName: cred.userName, nit: cred.nit } })
      return res.json({ token })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  getPeopleXmlReport = async (req, res) => {
    try {
      const people = await Person.findAll({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
      })

      if (!people || people.length === 0) {
        return res.status(404).json({ message: 'No people found to generate a report.' })
      }

      const totalPeople = people.length
      const monthCounts = new Array(12).fill(0)
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]

      people.forEach(person => {
        if (person.birthdate) {
          // Birthdate is DATEONLY (YYYY-MM-DD), getMonth() is 0-indexed
          const birthMonth = new Date(person.birthdate).getMonth()
          monthCounts[birthMonth]++
        }
      })

      const root = create({ version: '1.0' }).ele('peopleReport')
      root.ele('totalPeople').txt(totalPeople.toString())

      const birthdayDistribution = root.ele('birthdayDistribution')
      monthCounts.forEach((count, index) => {
        const percentage = totalPeople > 0 ? ((count / totalPeople) * 100).toFixed(2) : '0.00'
        birthdayDistribution.ele('month', { name: monthNames[index] })
          .ele('count').txt(count.toString()).up()
          .ele('percentage').txt(percentage + '%').up()
      })

      const peopleData = root.ele('peopleData')
      people.forEach(person => {
        const personElement = peopleData.ele('person')
        Object.entries(person.toJSON()).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            personElement.ele(key).txt(value.toString())
          }
        })
      })

      const xml = root.end({ prettyPrint: true })
      res.header('Content-Type', 'application/xml')
      res.status(200).send(xml)
    } catch (error) {
      return res.status(500).json({ message: 'Error generating XML report: ' + error.message })
    }
  }
}

function createToken ({ data }) {
  const payLoad = {
    userName: data.userName,
    nit: data.nit
  }
  return jwt.sign(payLoad, process.env.SECRET_KEY)
}

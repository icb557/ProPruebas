import bcrypt from 'bcrypt'
import { TestUser } from '../models/testUser.model.js'
import { Person } from '../models/person.model.js'

export async function inserts () {
  const password = await bcrypt.hash('P@ssw0rd', 12)
  // testUsers table
  const testUsers = [
    {
      testCase: 'create',
      happy: true,
      nit: '1234567890',
      firstName: 'isac',
      middleName: '',
      lastName1: 'cortes',
      lastName2: 'buitrago',
      birthdate: '2000-02-04',
      phoneNumber: '3145351114',
      email: 'isac@gmail.com',
      userName: 'Isaccor3',
      password
    },
    {
      testCase: 'create',
      happy: true,
      nit: '1987654321',
      firstName: 'Juan',
      middleName: '',
      lastName1: 'Estrada',
      lastName2: 'Velez',
      birthdate: '2001-02-04',
      phoneNumber: '3100243256',
      email: 'juan@gmail.com',
      userName: 'Juanest9',
      password
    },
    {
      testCase: 'create',
      happy: true,
      nit: '1111111111',
      firstName: 'pedro',
      middleName: '',
      lastName1: 'sanchez',
      lastName2: 'perez',
      birthdate: '2004-01-06',
      phoneNumber: '3564695783',
      email: 'pedro@gmail.com',
      userName: 'Pedrosa0',
      password
    },
    { // change phone and birthdate
      testCase: 'update',
      happy: true,
      nit: '1234567890',
      firstName: 'isac',
      middleName: '',
      lastName1: 'cortes',
      lastName2: 'buitrago',
      birthdate: '2001-02-04',
      phoneNumber: '3333333333',
      email: 'isac@gmail.com',
      userName: 'Isaccor3',
      password
    },
    { // change midname and email
      testCase: 'update',
      happy: true,
      nit: '1987654321',
      firstName: 'Juan',
      middleName: 'Jose',
      lastName1: 'Estrada',
      lastName2: 'Velez',
      birthdate: '2001-02-04',
      phoneNumber: '3100243256',
      email: 'juan123@gmail.com',
      userName: 'Juanest9',
      password
    },
    {
      testCase: 'delete',
      happy: true,
      nit: '1234567890',
      firstName: 'isac',
      middleName: '',
      lastName1: 'cortes',
      lastName2: 'buitrago',
      birthdate: '2001-02-04',
      phoneNumber: '3333333333',
      email: 'isac@gmail.com',
      userName: 'Isaccor3',
      password
    },
    {
      testCase: 'delete',
      happy: true,
      nit: '1987654321',
      firstName: 'Juan',
      middleName: 'Jose',
      lastName1: 'Estrada',
      lastName2: 'Velez',
      birthdate: '2001-02-04',
      phoneNumber: '3100243256',
      email: 'juan123@gmail.com',
      userName: 'Juanest9',
      password
    }
  ]

  await TestUser.bulkCreate(testUsers)

  // People table
  const adminUsers = [
    {
      nit: '4444444444',
      firstName: 'admin',
      middleName: '',
      lastName1: 'admin',
      lastName2: 'admin',
      birthdate: '2000-02-04',
      phoneNumber: '3145351114',
      email: 'admin@gmail.com',
      userName: 'Admipro1',
      password
    }]

  await Person.bulkCreate(adminUsers)
}

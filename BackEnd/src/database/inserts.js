import bcrypt from 'bcrypt'
import { TestUser } from '../models/testUser.model.js'
import { Person } from '../models/person.model.js'

export async function inserts () {
  let password = 'P@ssw0rd'
  // testUsers table
  const testUsers = [
    // happy tests cases
    {
      testCase: 'login',
      happy: true,
      userName: 'Admipro1',
      password
    },
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
    // NO HAPPY TESTS CASES
    { //  invalid userName
      testCase: 'login',
      happy: false,
      userName: 'usuarioooooooo',
      password
    },
    { //  invalid password
      testCase: 'login',
      happy: false,
      userName: 'Admipro1',
      password: '12345'
    },
    { // empty fields
      testCase: 'login',
      happy: false,
      userName: '',
      password: ''
    },
    { //  no registered user
      testCase: 'login',
      happy: false,
      userName: 'Admipro2',
      password
    },
    { // invalid int
      testCase: 'create',
      happy: false,
      nit: '123',
      firstName: 'isac',
      middleName: '',
      lastName1: 'cortes',
      lastName2: 'buitrago',
      birthdate: '2001-02-04',
      phoneNumber: '3145351114',
      email: 'isac@gmail.com',
      userName: 'Isaccor3',
      password
    },
    { // underage person
      testCase: 'create',
      happy: false,
      nit: '1234567890',
      firstName: 'isac',
      middleName: '',
      lastName1: 'cortes',
      lastName2: 'buitrago',
      birthdate: '2011-02-04',
      phoneNumber: '3145351114',
      email: 'isac@gmail.com',
      userName: 'Isaccor3',
      password
    },
    { // invalid mail
      testCase: 'create',
      happy: false,
      nit: '1234567890',
      firstName: 'isac',
      middleName: '',
      lastName1: 'cortes',
      lastName2: 'buitrago',
      birthdate: '2001-02-04',
      phoneNumber: '3145351114',
      email: 'isacgmail.com',
      userName: 'Isaccor3',
      password
    },
    { // registered user
      testCase: 'create',
      happy: false,
      nit: '4444444444',
      firstName: 'isac',
      middleName: '',
      lastName1: 'cortes',
      lastName2: 'buitrago',
      birthdate: '2001-02-04',
      phoneNumber: '3145351114',
      email: 'isacgmail.com',
      userName: 'Isaccor3',
      password
    },
    { // invalid phone
      testCase: 'update',
      happy: false,
      nit: '1987654321',
      firstName: 'Juan',
      middleName: 'Jose',
      lastName1: 'Estrada',
      lastName2: 'Velez',
      birthdate: '2001-02-04',
      phoneNumber: '1234',
      email: 'juan123@gmail.com',
      userName: 'Juanest9',
      password
    },
    { // invalid date
      testCase: 'update',
      happy: false,
      nit: '1987654321',
      firstName: 'Juan',
      middleName: 'Jose',
      lastName1: 'Estrada',
      lastName2: 'Velez',
      birthdate: '2012-02-04',
      phoneNumber: '3100243256',
      email: 'juan123@gmail.com',
      userName: 'Juanest9',
      password
    },
    { // invalid nit
      testCase: 'search',
      happy: false,
      nit: '19876543'
    },
    { // not registered person
      testCase: 'search',
      happy: false,
      nit: '1000000000'
    }
  ]

  await TestUser.bulkCreate(testUsers)

  // People table
  password = await bcrypt.hash('P@ssw0rd', 12)
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
    },
    {
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
    }
  ]

  await Person.bulkCreate(adminUsers)
}

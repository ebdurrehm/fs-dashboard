const request = require('supertest')
const app = require('../app')

const {
  connectMongodb,
  disconnectMongodb
} = require('../../data/config/mongo.connection')
const deployDataToDB = require('../models/planets.model')
describe('Launches tests', () => {
  beforeAll(async () => {
    await connectMongodb('mongodb://localhost:27017')
    deployDataToDB()
  })

  afterAll(async () => {
    await disconnectMongodb()
  })
  describe('test GET /launches', () => {
    test('it should return 200 status code', async () => {
      const response = await request(app).get('/launches')
        .expect('Content-type', /json/)
        .expect(200)
    })
  })

  describe('test POST /launches', () => {
    const fakeData = {
      rocket: 'Azerspace',
      launchDate: new Date('February 23,2022'),
      mission: 'exploring Mars',
      target: 'kapler 101'
    }

    test('it should return 201 status code', async () => {
      await request(app).post('/launches')
        .send(fakeData)
        .expect(201)
    })

    test('it should return a json success message', async () => {
      const response = await request(app).post('/launches')
        .send(fakeData)

      expect(response.body).toMatchObject({
        message: 'saved'
      })
    })

    test('it should return an error message and 400 status code when one of the field is missed', async () => {
      const response = await request(app).post('/launches')
        .send({})
        .expect(400)

      expect(response.body).toMatchObject({
        error: 'one of the launch properties is missed'
      })
    })

    test('it should return an error and 400 code when date format given in false format', async () => {
      const response = await request(app)
        .post('/launches')
        .send({
          rocket: 'Azerspace',
          launchDate: 'tghytjuyj',
          mission: 'exploring Mars',
          target: 'kapler 101'
        })
        .expect(400)

      expect(response.body).toMatchObject({
        error: 'invalid date format'
      })
    })

    // test('it should return 200 status code when launch is deleted', async () => {
    //   await request(app)
    //     .delete('/launches')
    //     .send({ id: 101 })
    //     .expect(200)
    // })

    test('it should return 400 status code and error message when given id is not found', async () => {
      const response = await request(app)
        .delete('/launches')
        .send({ id: 233 })
        .expect(400)

      expect(response.body).toMatchObject({
        message: 'this launch does not  exist'
      })
    })
  })
})

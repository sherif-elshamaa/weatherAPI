import supertest from 'supertest'
import app from '../../../index'
import { dropCollections } from '../../../database/db.config'
import mongoose from 'mongoose'

describe('Authentication API', () => {
  let request: supertest.SuperTest<supertest.Test>

  beforeAll(() => {
    request = supertest(app)
  })

  afterAll(async () => {
    await dropCollections()
    await mongoose.connection.close()
  })

  it('should return 200 and a token and email on successful registration', async () => {
    const res = await request
      .post('/api/auth/create')
      .set('Content-Type', 'application/json')
      .send({ email: 'test@example.com', password: 'password' })

    const { token, email } = res.body
    expect(res.status).toBe(200)
    expect(email).toBe('test@example.com')
    expect(token).toBeDefined()
  })

  it('should return 200 and a token and email on successful login', async () => {
    const res = await request
      .get('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({ email: 'test@example.com', password: 'password' })

    const { token, email } = res.body
    expect(res.status).toBe(200)
    expect(email).toBe('test@example.com')
    expect(token).toBeDefined()
  })
})

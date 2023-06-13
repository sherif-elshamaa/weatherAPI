import supertest from 'supertest'
import app from '../index'

const req = supertest(app)

describe('Testing endpoints', () => {
  it('get / should response status code 200', async () => {
    const res = await req.get('/')
    expect(res.status).toBe(200)
  })
})

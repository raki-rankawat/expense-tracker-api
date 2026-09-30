import request from 'supertest'
import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import app from './app'

let mongoServer: MongoMemoryServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
  await mongoose.connection.db?.dropDatabase()
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('GET /', () => {
  it('should return API status', async () => {
    const res = await request(app).get('/')

    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      message: 'Expense Tracker API is running',
    })
  })
})

describe('Expenses API', () => {
  const payload = {
    description: 'Food',
    amount: 25,
    category: 'Food',
    date: '2026-09-30',
  }
  let createdId: string

  it('should create an expense', async () => {
    const res = await request(app).post('/api/expenses').send(payload)

    expect(res.status).toBe(201)
    expect(res.body.description).toBe('Food')
    expect(res.body.amount).toBe(25)
    expect(res.body.category).toBe('Food')
    createdId = res.body._id
  })

  it('should update an expense', async () => {
    const res = await request(app)
      .put(`/api/expenses/${createdId}`)
      .send({ ...payload, amount: 30 })

    expect(res.status).toBe(200)
    expect(res.body.amount).toBe(30)
  })

  it('should get all expenses', async () => {
    const res = await request(app).get('/api/expenses')

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
  })

  it('should get single expense', async () => {
    const res = await request(app).get(`/api/expenses/${createdId}`)

    expect(res.status).toBe(200)
    expect(res.body._id).toBe(createdId)
    expect(res.body.description).toBe('Food')
  })

  it('should delete expense', async () => {
    const res = await request(app).delete(`/api/expenses/${createdId}`)

    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      message: 'Expense deleted successfully',
    })
  })

  it('should return 404 for a missing expense', async () => {
    const fakeId = new mongoose.Types.ObjectId()

    const res = await request(app).get(`/api/expenses/${fakeId}`)

    expect(res.status).toBe(404)
    expect(res.body.message).toBe('Expense not found')
  })
})

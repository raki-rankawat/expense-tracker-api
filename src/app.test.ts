import request from 'supertest'
import { describe, expect, it } from 'vitest'
import app from './app'

describe('GET /', () => {
  it('should return API status', async () => {
    const res = await request(app).get('/')

    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      message: 'Expense Tracker API is running',
    })
  })
})

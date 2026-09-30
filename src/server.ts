import express from 'express'
import 'dotenv/config'

import connectDB from './db'

const app = express()
connectDB()

const PORT = 5000

app.use(express.json())

const expenses = [
  {
    id: 1,
    description: 'Food',
    amount: 25,
    category: 'Food',
    date: '2026-09-30',
  },
]

// Routes
app.get('/api/expenses', (req, res) => {
  res.json(expenses)
})

app.get('/api/expenses/:id', (req, res) => {
  const id = Number(req.params.id)

  const expense = expenses.find(expense => expense.id === id)

  if (!expense) {
    return res.status(404).json({
      message: 'Expense not found',
    })
  }

  res.json(expense)
})

app.post('/api/expenses', (req, res) => {
  const expense: any = {
    id: expenses.length + 1,
    description: req.body.description,
    amount: req.body.amount,
    category: req.body.category,
    date: Date.now(),
  }

  expenses.push(expense)

  res.status(201).json(expense)
})

app.get('/', (req, res) => {
  res.json({
    message: 'Expense Tracker API is running',
  })
})

app.listen(PORT, () => {
  console.log(`Server runing on http://localhost:${PORT}`)
})

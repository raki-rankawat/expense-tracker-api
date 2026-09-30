import express from 'express'
import Expense from './models/expense.model'

const app = express()

app.use(express.json())

// API Health
app.get('/', (req, res) => {
  res.json({
    message: 'Expense Tracker API is running',
  })
})

// Expense routes
app.get('/api/expenses', async (req, res) => {
  const expenses = await Expense.find()
  res.json(expenses)
})

app.get('/api/expenses/:id', async (req, res) => {
  const expense = await Expense.findById(req.params.id)

  if (!expense) {
    return res.status(404).json({
      message: 'Expense not found',
    })
  }

  res.json(expense)
})

app.post('/api/expenses', async (req, res) => {
  const expense = await Expense.create(req.body)
  res.status(201).json(expense)
})

app.put('/api/expenses/:id', async (req, res) => {
  const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!expense) {
    return res.status(404).json({
      message: 'Expense not found',
    })
  }

  res.json(expense)
})

app.delete('/api/expenses/:id', async (req, res) => {
  const expense = await Expense.findByIdAndDelete(req.params.id)

  if (!expense) {
    return res.status(404).json({
      message: 'Expense not found',
    })
  }

  res.json({
    message: 'Expense deleted successfully',
  })
})

export default app

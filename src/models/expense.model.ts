import { Schema, model, Document } from 'mongoose'

export interface IExpense extends Document {
  description: string
  amount: number
  category: string
  date: string
}

const expenseSchema = new Schema<IExpense>(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default model<IExpense>('Expense', expenseSchema)

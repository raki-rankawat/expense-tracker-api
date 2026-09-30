import 'dotenv/config'
import connectDB from './db'
import app from './app'

connectDB()

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server runing on http://localhost:${PORT}`)
})

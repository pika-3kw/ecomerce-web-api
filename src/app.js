require('dotenv/config')
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

/**
 * Routes
 */

const productRoutes = require('./routes/product.routes')
const categoryRoutes = require('./routes/category.routes')
const orderRoutes = require('./routes/order.routes')
const userRoutes = require('./routes/user.routes')

const { API_URL, DB_CONNECT_STRING } = process.env

const app = express()

app.use(cors())
app.options('*', cors())

app.use(express.json())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
  res.send('Hello')
})

app.use(`${API_URL}/products`, productRoutes)
app.use(`${API_URL}/categories`, categoryRoutes)
app.use(`${API_URL}/orders`, orderRoutes)
app.use(`${API_URL}/users`, userRoutes)

mongoose
  .connect(DB_CONNECT_STRING)
  .then(() => {
    console.log('Database connection is ready.')
  })
  .catch((error) => {
    console.log(error)
  })

app.listen(3000, () => {
  console.log('Server is running at PORT 3000.')
})

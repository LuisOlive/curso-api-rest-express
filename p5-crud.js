require('dotenv').config()
const express = require('express')
const mongodbInit = require('./mongodbInit')
const pizzasRouter = require('./routers/pizzasRouter')

const { PORT } = process.env
const app = express()

mongodbInit('pizzeria').then(() => console.log('db ready'))

app.use(express.json())

app.get('/', (_, res) => res.send('pizzeria is open!'))

app.use('/api/pizzas', pizzasRouter)

app.listen(PORT, () => console.log(`server ready on port ${PORT}`))

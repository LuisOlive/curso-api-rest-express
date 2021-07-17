require('dotenv').config()
const express = require('express')
const mongodbInit = require('./mongodbInit')
const usersRouter = require('./routers/usersRouter')

const { PORT } = process.env
const app = express()
app.use(express.json())
mongodbInit('hospital').then(() => console.log('db ready'))

app.use('/api', usersRouter)

app.listen(PORT, () => console.log(`server ready on port ${PORT}`))

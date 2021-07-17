const express = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config
const { name, internet } = require('faker/locale/es_MX')

dotenv()
const app = express()
const { JWT_PASSWORD } = process.env

app.post('/login', (req, res) => {
  const user = { id: 0, firstName: name.firstName(), lastName: name.lastName() }
  user.email = internet.email(user.firstName, user.lastName)

  jwt.sign(user, JWT_PASSWORD, { expiresIn: '30s' }, (err, token) =>
    err ? console.error(err) : res.json({ token })
  )
})

app.post('/uploadpost', thereIsTokenMiddleware, (req, res) => {
  jwt.verify(req.token, JWT_PASSWORD, (err, payload) =>
    err ? res.sendStatus(403) : res.json({ result: 'succesfull', payload })
  )
})

app.listen(3000, () => console.log('server ready'))

function thereIsTokenMiddleware(req, res, next) {
  const { authorization } = req.headers

  if (typeof authorization !== 'undefined') {
    req.token = authorization.split(' ')[1]
    return next()
  }

  res.sendStatus(403)
}

const express = require('express')
const { body, validationResult } = require('express-validator')
require('dotenv').config()

const app = express()

app.use(express.json())

app.post(
  '/api/register',
  body('email').exists().isEmail(), // email valitation middleware
  body('password').exists().isLength({ min: 8 }),
  //
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    res.send('user will be registered')
  }
)

app.listen(3000, () => console.log('server ready'))

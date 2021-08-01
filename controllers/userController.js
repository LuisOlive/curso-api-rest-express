const User = require('../models/User')

async function signIn(req, res) {
  const { name, email, password, role } = req.body
  const user = new User({ name, email, password, role })

  try {
    await user.save()

    res.json({ error: null, token: user.sign() })
  } catch (error) {
    res.status(401).json({ error })
  }
}

function logIn(req, res) {
  if (req.user) return res.json({ error: null, token: User.generateToken(req.user) })

  res.status(501).json({ error: 'something wrong' })
}

function access(req, res) {
  if (req.user) return res.send('this text is extremely ultra secret')

  res.status(403).json({ error: 'user incorrect' })
}

module.exports = { signIn, logIn, access }

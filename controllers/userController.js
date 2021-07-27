const User = require('../models/User')

async function signIn(req, res) {
  const { name, email, password, role } = req.body
  const user = new User({ name, email, password, role })

  try {
    await user.validate()

    user.password = await User.encryptPassword(user.password)

    if (await User.findOne({ email: user.email }))
      return res.status(401).json({ error: 'email all ready exists' })

    await user.save()

    res.json({ error: null, token: User.generateToken(user) })
    //
  } catch (error) {
    console.error(error)
    res.status(401).json({ error })
  }
}

async function logIn(req, res) {
  if (req.user) return res.json({ error: null, token: User.generateToken(req.user) })

  res.status(501).json({ error: 'something wrong' })
}

async function access(req, res) {
  if (req.user) return res.send('this text is extremely ultra secret')

  res.status(403).json({ error: 'user incorrect' })
}

module.exports = { signIn, logIn, access }

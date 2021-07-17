const { compare } = require('bcrypt')
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
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) res.satus(401).json({ error: `email ${user.email} not found` })

    const passwordIsCorrect = await compare(password, user.password)

    if (!passwordIsCorrect) res.satus(401).json({ error: `password ${user.email} is incorrect` })

    res.json({ error: null, token: User.generateToken(user) })
    //
  } catch (error) {
    res.status(401).json({ error })
  }
}

module.exports = { signIn, logIn }

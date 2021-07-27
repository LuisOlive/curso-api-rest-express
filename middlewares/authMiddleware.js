const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = async function authMiddleware(req, res, next) {
  const { email, password } = req.posibleUser || req.body

  try {
    const user = await User.findOne({ email })

    if (!user) return res.status(401).json({ error: `email ${email} not found` })

    const passwordIsCorrect =
      password === user.password || (await bcrypt.compare(password, user.password))

    if (!passwordIsCorrect)
      return res.status(401).json({ error: 'password is incorrect', user, email, password })

    req.user = user
    return next()
    //
  } catch (error) {
    res.status(401).json({ error })
  }
}

const jwt = require('jsonwebtoken')

const { JWT_PASSWORD } = process.env

module.exports = async function jwtMiddleware(req, res, next) {
  const { authorization } = req.headers

  try {
    const [bearer, token] = authorization.split(' ')

    const result = jwt.verify(token, JWT_PASSWORD)

    if (bearer === 'bearer' && result) {
      req.posibleUser = result
      return next()
    }

    res.status(403).json({ error: 'token is incorrect or doesnt exist' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

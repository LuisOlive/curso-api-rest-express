const { Router } = require('express')
const userController = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

const userRouter = new Router()

userRouter.post('/signIn', userController.signIn)
userRouter.post('/logIn', authMiddleware, userController.logIn)

userRouter.get('/private', jwtMiddleware, authMiddleware, userController.access)

module.exports = userRouter

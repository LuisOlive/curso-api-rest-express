const { Router } = require('express')
const userController = require('../controllers/userController')

const userRouter = new Router()

userRouter.post('/signIn', userController.signIn)
userRouter.post('/logIn', userController.logIn)

module.exports = userRouter

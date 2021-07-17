const { Router } = require('express')
const pizzasController = require('../controllers/pizzasController')

const pizzasRouter = new Router()

pizzasRouter.post('/', pizzasController.uploadPizza)
pizzasRouter.get('/', pizzasController.getPizzas)
pizzasRouter.put('/edit/:id', pizzasController.editPizza)
pizzasRouter.delete('/del/:id', pizzasController.deletePizza)
pizzasRouter.put('/buy/:id/:howMany?', pizzasController.buyPizza)

module.exports = pizzasRouter

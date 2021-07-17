const Pizza = require('../models/Pizza')

/**
 * @type {express.Middleware}
 */
async function uploadPizza(req, res) {
  const { name, ingredients, price } = req.body

  try {
    await Pizza.create({ name, ingredients, price, sold: 0 })
    //
  } catch (err) {
    return res.status(400).json(err)
  }

  res.json({ saveOperation: 'sucesss', name, ingredients, price })
}

async function getPizzas(req, res) {
  const {} = req.body

  try {
    const pizzas = await Pizza.find()
    res.json({ pizzas })
    //
  } catch (err) {
    return res.status(400).json(err)
  }
}

async function editPizza(req, res) {
  const {
    params: { id },
    body
  } = req

  try {
    const pizza = await Pizza.findById(id)

    await pizza.updateOne(body)

    res.json({ msg: 'updating success, pizza has been modified', target: pizza, updated: body })
    //
  } catch (err) {
    return res.status(400).json(err)
  }
}

async function buyPizza(req, res) {
  const { id } = req.params
  const n = req.params.howMany || 1

  try {
    const pizza = await Pizza.findById(id)

    await pizza.updateOne({ sold: pizza.sold + parseInt(n) })

    res.json({ msg: `updating success, ${n} pizzas has been bougth` })
    //
  } catch (err) {
    return res.status(400).json(err)
  }
}

async function deletePizza(req, res) {
  const { id } = req.params

  try {
    const pizza = await Pizza.findById(id)

    await pizza.deleteOne()

    res.json({ msg: `${pizza.name} has been deleted` })
    //
  } catch (err) {
    return res.status(400).json(err)
  }
}

module.exports = { uploadPizza, getPizzas, editPizza, buyPizza, deletePizza }

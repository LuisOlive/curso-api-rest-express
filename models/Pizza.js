const { Schema, model } = require('mongoose')

const PizzaSchema = new Schema({
  name: String,
  ingredients: Array,
  price: Number,
  sold: Number
})

module.exports = model('Pizza', PizzaSchema)

import { Schema, model } from 'mongoose'

const DishSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  engreediants: {
    type: Array,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
})

module.exports = model('Dish', DishSchema)

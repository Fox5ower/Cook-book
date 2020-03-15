import { Schema, model } from 'mongoose'

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
})

module.exports = model('Category', CategorySchema)

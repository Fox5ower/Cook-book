import { Schema, model } from 'mongoose'

const AdminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "admin",
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = model('Admin', AdminSchema)

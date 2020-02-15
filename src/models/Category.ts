import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
    key: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = model("Category", CategorySchema);
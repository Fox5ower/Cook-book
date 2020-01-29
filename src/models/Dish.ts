var { Schema, model } = require("mongoose");

const DishSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    engreediants: {
        type: Array,
        required: true
    }
})

module.exports = model("Dish", DishSchema);

import { Schema, model } from "mongoose";

const RatingSchema = new Schema({
    dish_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
})

module.exports = model('Rating', RatingSchema)
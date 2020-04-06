import { Schema, model } from "mongoose";

const LikeSchema = new Schema({
    action: {
        type: String,
        required: true
    },
    dish_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
})

module.exports = model('Like', LikeSchema)
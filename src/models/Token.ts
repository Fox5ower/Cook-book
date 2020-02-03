import { Schema, model } from "mongoose";

const TokenSchema = new Schema({
    token: {
        type: String,
        required: true
    }
})

// module.exports = model("Token", TokenSchema);

export default model("TokenBlackList", TokenSchema);
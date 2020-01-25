const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const testRouter = require("./dist/routes/testRoute")

const app = express();

const PORT = config.get("port");
async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.use('/', testRouter);

        app.listen(PORT, () => {
            console.log(`App has been started at PORT: ${PORT}...`);
        })

    } catch (e) {
        console.log(e.message);
        process.exit(1);
    }
}

start();
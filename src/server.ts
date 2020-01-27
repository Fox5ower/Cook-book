import App from "./app";
import bodyParser from "body-parser";
import logger from "./middlewares/logger"
import HomeController from "./controllers/home.controller"
const config = require("config");

const app = new App({
    port: config.get("port"),
    mongoUri: config.get("mongoUri"),
    controllers: [
        new HomeController()
    ],

    middlewares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        logger
    ]
})

app.mongoConnect()

app.listen()
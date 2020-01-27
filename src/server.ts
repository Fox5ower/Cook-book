import App from "./app";
import bodyParser from "body-parser";
import logger from "./middlewares/logger";
import AdminController from "./controllers/admin.controller";
const config = require("config");

const app = new App({
    port: config.get("port"),
    mongoUri: config.get("mongoUri"),
    controllers: [
        new AdminController()
    ],

    middlewares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        logger
    ]
})

app.mongoConnect()

app.listen()
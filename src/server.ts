import App from "./app";
import bodyParser from "body-parser";
import logger from "./middlewares/logger";
import AdminController from "./controllers/admin_controllers/admin.controller";
// import RegisterController from "./controllers/register.controller";
// import LoginController from "./controllers/login.controller";
import AdminLoginController from "./controllers/admin_controllers/admin.login.controller";
import AdminDishController from "./controllers/admin_controllers/admin.dish.controller";
import DishController from "./controllers/dish.controller";
const express = require("express")
const config = require("config");

const app = new App({
    port: config.get("port"),
    mongoUri: `${config.get("mongoUri")}${config.get("dbName")}`,
    controllers: [
        new AdminController(),
        new AdminLoginController(),
        // new RegisterController(),
        // new LoginController(),
        new AdminDishController(),
        new DishController()
    ],

    middlewares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        logger,
        express.static("uploads")
    ]
})

app.dbConnect();

app.listen();
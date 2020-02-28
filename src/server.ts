import App from "./app";
import bodyParser from "body-parser";
import logger from "./middlewares/logger";
import headers from "./middlewares/headers"
import AdminController from "./controllers/admin_controllers/admin.controller";
// import RegisterController from "./controllers/register.controller";
// import LoginController from "./controllers/login.controller";
import AdminLoginController from "./controllers/admin_controllers/admin.login.controller";
import AdminDishController from "./controllers/admin_controllers/admin.dish.controller";
import DishController from "./controllers/dish.controller";
import AdminLogoutController from "./controllers/admin_controllers/admin.logout.controller";
import CategoryController from "./controllers/category.controller";
const express = require("express")
const config = require("config");
const path = require("path");

const app = new App({
    port: config.get("port"),
    mongoUri: `${config.get("mongoUri")}${config.get("dbName")}`,
    controllers: [
        new AdminController(),
        new AdminLoginController(),
        // new RegisterController(),
        // new LoginController(),
        new AdminDishController(),
        new DishController(),
        new AdminLogoutController(),
        new CategoryController()
    ],

    middlewares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        logger,
        express.static("uploads"),
        express.static(path.resolve("./", "public")),
        headers
    ]
})

app.dbConnect();

app.listen();
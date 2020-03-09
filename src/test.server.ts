import App from "./app";
import bodyParser from "body-parser";
import logger from "./middlewares/logger";
import headers from "./middlewares/headers"
import AdminController from "./controllers/admin_controllers/admin.controller";
import AdminLoginController from "./controllers/admin_controllers/admin.login.controller";
import AdminDishController from "./controllers/admin_controllers/admin.dish.controller";
import DishController from "./controllers/dish.controller";
import AdminLogoutController from "./controllers/admin_controllers/admin.logout.controller";
import CategoryController from "./controllers/category.controller";
import ClientRoutesController from "./controllers/client.routes.controller";
import express from "express";
import config from "config";
import path from "path";

const app = new App({
    port: "3002",
    mongoUri: config.get("testdb"),
    controllers: [
        new AdminController(),
        new AdminLoginController(),
        new AdminDishController(),
        new DishController(),
        new AdminLogoutController(),
        new CategoryController(),
        new ClientRoutesController()
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

const server = app.listen()
export default server;
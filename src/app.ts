import express from "express";
import { Application } from 'express';
import dishData from "../config/dish.json";
import adminInitializer from "./db_scripts/admin.initialize";
import dishInitializer from "./db_scripts/dish.initialize";
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Admin = require("./models/Admin");
const Dish = require("./models/Dish");


class App {
    public app: Application
    public port: string
    public mongoUri: string

    constructor(appInit: { port: string; mongoUri: string, middlewares: any, controllers: any }) {
        this.app = express()
        this.port = appInit.port
        this.mongoUri = appInit.mongoUri

        this.middlewares(appInit.middlewares)
        this.routes(appInit.controllers)
    }

    private routes(controllers: { forEach: (arg: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            if (controller.name == "AdminLoginController" || controller.name == "DishController" /* || controller.name == "RegisterController" || controller.name == "LoginController" */) {
                this.app.use("/", controller.router)
            } else {
                this.app.use("/api", controller.router)
            }
        })
    }

    private middlewares(middleWares: { forEach: (arg: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    public async dbConnect() {
        await mongoose.connect(this.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }).then(adminInitializer)
            .then(dishInitializer,
                console.log(`Connected to Mongo DB with URI: ${this.mongoUri}`))
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`This app is listening on http://localhost:${this.port}`);
        })
    }

}

export default App;
import express from "express";
import { Application } from 'express';
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Admin = require("./models/Admin");


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
            if (controller.name == "AdminLoginController" || controller.name == "RegisterController" || controller.name == "LoginController") {
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
        }).then(async () => {
            const admin = await Admin.find()
            if (admin.length >= 1) {
                console.log("Admin already exists")
                console.log(admin);

                return;
            } else {
                const admin = new Admin({
                    name: "admin",
                    password: "admin",
                    email: "admin@admin.com"
                });

                bcrypt.genSalt(10, (err: Error, salt: any) => {
                    bcrypt.hash(admin.password, salt, (err: Error, hash: any) => {
                        if (err) throw err;
                        admin.password = hash;
                        admin.save()
                    })
                })
            }
        })

        console.log(`Connected to Mongo DB with URI: ${this.mongoUri}`);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`This app is listening on http://localhost:${this.port}`);
        })
    }

}

export default App;
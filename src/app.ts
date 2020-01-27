import express from "express";
import { Application } from 'express'
const mongoose = require("mongoose");


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
            this.app.use("/", controller.router)
        })
    }

    private middlewares(middleWares: { forEach: (arg: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    public async mongoConnect() {
        await mongoose.connect(this.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log(`Connected to Mongo DB with URI: ${this.mongoUri}`);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`This app is listening on http://localhost:${this.port}`);
        })
    }

}

export default App;
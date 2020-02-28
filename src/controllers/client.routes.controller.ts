import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "../interfaces/IControllerBase";
const path = require("path");
const config = require("config");

const paths = config.get("clientRoutesArr").split(",");

class ClientRoutesController implements IControllerBase {
    public router = express.Router();
    public name = "DishController"

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(paths, this.index)
    }

    index = function (req: Request, res: Response, next: any) {
        res.sendFile(path.resolve('./public', 'index.html'));
    }
}

export default ClientRoutesController;
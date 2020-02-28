import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "../interfaces/IControllerBase";
const Dish = require("../models/Dish");
const path = require("path");

class ClientRoutesController implements IControllerBase {
    public router = express.Router();
    public name = "DishController"

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(["/home", "/dishes", "/login", "/admin", "/admin/add", "/admin/category", "/admin/remove_category"], this.index)
    }

    index = function (req: Request, res: Response, next: any) {
        res.sendFile(path.resolve('./public', 'index.html'));
    }
}

export default ClientRoutesController;
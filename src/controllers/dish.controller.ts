import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "../interfaces/IControllerBase";
const Dish = require("../models/Dish");
const path = require("path");

class DishController implements IControllerBase {
    public path = "/getdishes";
    public router = express.Router();
    public name = "DishController"

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(`${this.path}`, this.index);
        this.router.get(`${this.path}/:dishId`, this.dishById);
    }

    index = async (req: Request, res: Response, next: any) => {
        const dish = await Dish.find();
        if (dish) {
            res.json({ dish });
        } else {
            res.status(404).json({ message: "Dishes Not found" })
        }
    }

    dishById = async (req: Request, res: Response, next: any) => {
        const dish = await Dish.findOne({ _id: req.params.dishId });

        if (dish) {
            res.json(dish);
        } else {
            res.status(404).json({ message: "Not Found" });
        }
    }
}

export default DishController;
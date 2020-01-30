import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "../interfaces/IControllerBase";
const Dish = require("../models/Dish");
const adminTokenChecker = require("../middlewares/adminTokenChecker")


class AdminPannelController implements IControllerBase {
    public path = "/admin/pannel";
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.use(adminTokenChecker)
        this.router.get(`${this.path}/`, this.index);
        this.router.post(`${this.path}/add`, this.addDish);
        this.router.delete(`${this.path}/remove/:dishId`, this.removeDish);
        this.router.put(`${this.path}/update/:dishId`, this.updateDish);
    }

    index = async (req: Request, res: Response, next: any) => {
        const dish = await Dish.find();
        if (dish) {
            res.json({ "All Dishes: ": dish });
        } else {
            res.status(404).json({ message: "Dishes Not found" })
        }
    }

    addDish = async (req: Request, res: Response, next: any) => {
        const dish = new Dish({
            name: req.body.name,
            category: req.body.category,
            method: req.body.method,
            description: req.body.description,
            engreediants: req.body.engreediants
        })
        const savedDish = await dish.save();
        if (savedDish) {
            res.json({ "Added new dish: ": savedDish.name });
        } else {
            res.status(401).json({ message: "Something went wrong" })
        }
    }

    removeDish = async (req: Request, res: Response, next: any) => {
        const removedDish = await Dish.deleteMany({ _id: req.params.dishId });

        if (removedDish) {
            res.json({ "Removed dish: ": removedDish.name });
        } else {
            res.status(401).json({ message: "Something went wrong" });
        }
    }


    updateDish = async (req: Request, res: Response) => {
        const oldDish = await Dish.findOne({ _id: req.params.dishId });
        const updatedDish = await Dish.updateOne({ _id: req.params.dishId }, {
            $set: {
                name: req.body.name || oldDish.name,
                category: req.body.category || oldDish.category,
                method: req.body.method || oldDish.method,
                description: req.body.description || oldDish.description,
                engreediants: req.body.engreediants || oldDish.engreediants
            }
        });
        if (updatedDish) {
            res.json({ "Updated Dish: ": updatedDish.name });
        } else {
            res.status(401).json({ message: "Something went wrong" })
        }
    }
}

export default AdminPannelController;
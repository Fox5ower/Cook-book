import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "../interfaces/IControllerBase";
const Category = require("../models/Category");

class CategoryController implements IControllerBase {
    public path = "/categories";
    public router = express.Router();
    public name = "CategoryController"

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(`${this.path}/:locale`, this.index);
        this.router.get(`${this.path}`, this.index);
    }

    index = async (req: Request, res: Response, next: any) => {
        if (req.params.locale) {
            const category = await Category.find({ language: req.params.locale === "ru" ? "Russian" : "English" });
            if (category) {
                res.json({ category });
            } else {
                res.status(404).json({ message: "Categories Not found" })
            }
        } else {
            const category = await Category.find();
            if (category) {
                res.json({ category });
            } else {
                res.status(404).json({ message: "Categories Not found" })
            }
        }
    }

    categoryById = async (req: Request, res: Response, next: any) => {
        const category = await Category.findOne({ _id: req.params.id });

        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ message: "Not Found" });
        }
    }
}

export default CategoryController;
import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "../../interfaces/IControllerBase";
const Dish = require("../../models/Dish");
const Category = require("../../models/Category");
const adminTokenChecker = require("../../middlewares/adminTokenChecker")
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: Function) {
        cb(null, "uploads");
    },
    filename: function (req: Request, file: Express.Multer.File, cb: Function) {
        cb(null, file.originalname)
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


class AdminDishController implements IControllerBase {
    public path = "/panel";
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.use(adminTokenChecker);
        this.router.post(`${this.path}/add`, upload.single("image"), this.addDish);
        this.router.post(`${this.path}/add_category`, this.addCategory);
        this.router.delete(`${this.path}/remove_category/:name`, this.removeCategory);
        this.router.delete(`${this.path}/remove/:name`, this.removeDish);
        this.router.put(`${this.path}/update/:name`, upload.single("image"), this.updateDish);
        this.router.get(`${this.path}/edit/:name`, this.dishByName);
    }

    addDish = async (req: Request, res: Response, next: any) => {

        const dish = new Dish({
            name: req.body.name,
            category: req.body.category,
            method: req.body.method,
            description: req.body.description,
            engreediants: req.body.engreediants.split(","),
            image: "/" + req.file.originalname
        })
        const savedDish = await dish.save();
        if (savedDish) {
            res.json({ "Added new dish: ": savedDish.name });
        } else {
            res.status(401).json({ message: "Something went wrong" })
        }
    }

    addCategory = async (req: Request, res: Response, next: any) => {
        const category = new Category({
            name: req.body.name
        })
        const savedCategory = await category.save();
        if (savedCategory) {
            res.json({ "Added new category: ": savedCategory.name });
        } else {
            res.status(401).json({ message: "Something went wrong" })
        }
    }

    removeDish = async (req: Request, res: Response, next: any) => {
        const removedDish = await Dish.deleteMany({ name: req.params.name });

        if (removedDish) {
            res.json({ "Removed dish: ": removedDish.name });
        } else {
            res.status(401).json({ message: "Something went wrong" });
        }
    }

    removeCategory = async (req: Request, res: Response, next: any) => {
        const removedCategory = await Category.deleteOne({ name: req.params.name });

        if (removedCategory) {
            res.json({ "Removed dish: ": removedCategory.name });
        } else {
            res.status(401).json({ message: "Something went wrong" });
        }
    }


    updateDish = async (req: Request, res: Response) => {
        const oldDish = await Dish.findOne({ name: req.params.name });
        console.log(req.file);
        if (req.file) {
            const updatedDish = await Dish.updateOne({ name: req.params.name }, {
                $set: {
                    name: req.body.name || oldDish.name,
                    category: req.body.category || oldDish.category,
                    method: req.body.method || oldDish.method,
                    description: req.body.description || oldDish.description,
                    engreediants: req.body.engreediants.split(",") || oldDish.engreediants,
                    image: "/" + req.file.originalname
                }
            })
            if (updatedDish) {
                res.json({ "Updated Dish: ": updatedDish.name });
            } else {
                res.status(401).json({ message: "Something went wrong" })
            }
        } else {
            const updatedDish = await Dish.updateOne({ name: req.params.name }, {
                $set: {
                    name: req.body.name || oldDish.name,
                    category: req.body.category || oldDish.category,
                    method: req.body.method || oldDish.method,
                    description: req.body.description || oldDish.description,
                    engreediants: req.body.engreediants.split(",") || oldDish.engreediants,
                    image: oldDish.image
                }
            })
            if (updatedDish) {
                res.json({ "Updated Dish: ": updatedDish.name });
            } else {
                res.status(401).json({ message: "Something went wrong" })
            }
        }

    }

    dishByName = async (req: Request, res: Response) => {
        const dish = await Dish.findOne({ name: req.params.name });
        if (dish) {
            res.json(dish);
        } else {
            res.status(404).json({ message: "Not Found" });
        }
    }
}

export default AdminDishController;
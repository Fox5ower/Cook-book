import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "../../interfaces/IControllerBase";
const Dish = require("../../models/Dish");
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
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
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
    public path = "/admin/pannel";
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.use(adminTokenChecker);
        this.router.post(`${this.path}/add`, upload.single("image"), this.addDish);
        this.router.delete(`${this.path}/remove/:dishId`, this.removeDish);
        this.router.put(`${this.path}/update/:dishId`, this.updateDish);
    }

    addDish = async (req: Request, res: Response, next: any) => {
        console.log(req.file);

        const dish = new Dish({
            name: req.body.name,
            category: req.body.category,
            method: req.body.method,
            description: req.body.description,
            engreediants: req.body.engreediants,
            image: req.file.path
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
                engreediants: req.body.engreediants || oldDish.engreediants,
                image: req.file.path || oldDish.image
            }
        });
        if (updatedDish) {
            res.json({ "Updated Dish: ": updatedDish.name });
        } else {
            res.status(401).json({ message: "Something went wrong" })
        }
    }
}

export default AdminDishController;
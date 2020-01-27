import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "../interfaces/IControllerBase";

class HomeController implements IControllerBase {
    public path = "/";
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get("/", this.index)
    }

    index = (req: Request, res: Response) => {
        res.json({
            id: 1,
            name: "DishName"
        })
    }
}

export default HomeController;
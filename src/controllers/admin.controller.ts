import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "../interfaces/IControllerBase";
const Admin = require("../models/Admin");


class AdminController implements IControllerBase {
    public path = "/admin";
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get("/admin", this.index);
        this.router.get("/admin/:adminId", this.specificAdmin);
        this.router.post("/admin/add", this.addAdmin);
        this.router.delete("/admin/remove/:adminId", this.deleteAdmin);
        this.router.patch("/admin/update/:adminId", this.updateAdmin);
    }

    index = async (req: Request, res: Response, next: any) => {
        try {
            const admins = await Admin.find();
            res.json({ "All Admins: ": admins });
        } catch (err) {
            res.json({ message: err })
        }
    }


    specificAdmin = async (req: Request, res: Response) => {
        try {
            const admin = await Admin.findById(req.params.adminId);
            res.json(admin);
        } catch (err) {
            res.json({ message: err })
        }

    }

    addAdmin = async (req: Request, res: Response) => {
        const admin = new Admin({
            name: req.body.name,
            password: req.body.password
        })
        try {
            const savedAdmin = await admin.save();
            res.json(savedAdmin)
            console.log(`New Admin has been added to DB: ${savedAdmin}`);
        } catch (err) {
            res.json({ message: err })
        }
    }


    deleteAdmin = async (req: Request, res: Response) => {
        try {
            const removedAdmin = await Admin.remove({ _id: req.params.adminId });
            res.json({ "Removed Admin: ": removedAdmin });
        } catch (err) {
            res.json({ message: err })
        }
    }

    updateAdmin = async (req: Request, res: Response) => {
        try {
            const updatedAdmin = await Admin.update({ _id: req.params.adminId }, {
                $set: {
                    name: req.body.name,
                    password: req.body.password
                }
            });
            res.json({ "Updated Admin: ": updatedAdmin });
        } catch (err) {
            res.json({ message: err })
        }
    }

}

export default AdminController;
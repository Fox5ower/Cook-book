import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "../interfaces/IControllerBase";
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const adminTokenChecker = require("../middlewares/adminTokenChecker")
const validatePasswordInputData = require("../validation/adminChangePass");
const validateInformationInputData = require("../validation/adminChangeInfo");


class AdminController implements IControllerBase {
    public path = "/admin";
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.use(adminTokenChecker)
        this.router.get(`${this.path}/`, this.index);
        this.router.put(`${this.path}/password`, this.adminChangePassword);
        this.router.put(`${this.path}/information`, this.adminChangeInfo);
    }

    index = async (req: Request, res: Response, next: any) => {
        const admin = await Admin.find();
        if (admin) {
            res.json({ "All Admins: ": admin });
        } else {
            res.status(404).json({ message: "Admin Not found" })
        }
    }

    adminChangePassword = async (req: Request, res: Response, next: any) => {
        const { errors, isValid } = validatePasswordInputData(req.body);

        if (!isValid) {
            return res.status(401).json(errors);
        }

        bcrypt.genSalt(10, (err: Error, salt: any) => {
            bcrypt.hash(req.body.password, salt, async (err: Error, hash: any) => {
                if (err) throw err;
                req.body.password = hash;
                const updatedAdmin = await Admin.updateOne({}, {
                    $set: {
                        password: hash
                    }
                })
                if (updatedAdmin) {
                    res.send("Password changed");
                } else {
                    res.status(401).json({ message: "Something went wrong" })
                }
            })
        })
    }

    adminChangeInfo = async (req: Request, res: Response, next: any) => {
        const { errors, isValid } = validateInformationInputData(req.body);

        if (!isValid) {
            return res.status(401).json(errors);
        }

        const updatedAdmin = await Admin.updateOne({}, {
            $set: {
                name: req.body.name,
                email: req.body.email
            }
        });
        if (updatedAdmin) {
            res.json({ "Updated Admin: ": updatedAdmin });
        } else {
            res.status(401).json({ message: "Something went wrong" })
        }
    }


    specificAdmin = async (req: Request, res: Response) => {
        const admin = await Admin.findById(req.params.adminId);
        if (admin) {
            res.json(admin);
        } else {
            res.status(404).json({ message: "Not found" })
        }
    }

    addAdmin = async (req: Request, res: Response) => {
        const admin = new Admin({
            name: req.body.name,
            password: req.body.password
        })
        const savedAdmin = await admin.save();
        if (savedAdmin) {
            res.json(savedAdmin);
            console.log(`New Admin has been added to DB: ${savedAdmin}`);
        } else {
            res.status(401).json({ message: "Something went wrong" })
        }
    }


    deleteAdmin = async (req: Request, res: Response) => {
        const removedAdmin = await Admin.deleteMany({ _id: req.params.adminId });
        if (removedAdmin) {
            res.json({ "Removed Admin: ": removedAdmin });
        } else {
            res.status(401).json({ message: "Something went wrong" })
        }
    }

    updateAdmin = async (req: Request, res: Response) => {
        const updatedAdmin = await Admin.update({ _id: req.params.adminId }, {
            $set: {
                name: req.body.name,
                password: req.body.password
            }
        });
        if (updatedAdmin) {
            res.json({ "Updated Admin: ": updatedAdmin });
        } else {
            res.status(401).json({ message: "Something went wrong" })
        }
    }

}

export default AdminController;
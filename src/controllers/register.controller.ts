import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "../interfaces/IControllerBase";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const validateRegisterInput = require("../validation/register.validation");

class RegisterController implements IControllerBase {
    public path = "/register";
    public router = express.Router();
    public name = "RegisterController";

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.post(`${this.path}`, this.register)
    }

    register = async (req: Request, res: Response) => {
        const { errors, isValid } = validateRegisterInput(req.body);

        if (!isValid) {
            return res.status(401).json(errors);
        }

        User.findOne({ email: req.body.email })
            .then((user: any) => {
                if (user) {
                    return res.status(401).json({ email: "Email already exists" });
                } else {
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    });

                    bcrypt.genSalt(10, (err: Error, salt: any) => {
                        bcrypt.hash(newUser.password, salt, (err: Error, hash: any) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(() => {
                                    const payload = {
                                        id: newUser.id,
                                        name: newUser.name
                                    };

                                    jwt.sign(
                                        payload,
                                        config.get("secretOrKey"),
                                        {
                                            expiresIn: 14400
                                        },
                                        (err: Error, token: string) => {
                                            res.json({
                                                success: true,
                                                token: token,
                                                userName: newUser.name,
                                                id: user.id
                                            })
                                            req.headers['access-token'] = token
                                        }
                                    )
                                })
                        })
                    })
                }
            })
    }
}

export default RegisterController;

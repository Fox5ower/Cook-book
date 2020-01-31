// import * as express from "express";
// import { Request, Response } from "express";
// import IControllerBase from "../interfaces/IControllerBase";
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");
// const validateRegisterInput = require("../validation/registerValidation");

// class RegisterController implements IControllerBase {
//     public path = "/register";
//     public router = express.Router();
//     public name = "RegisterController";

//     constructor() {
//         this.initRoutes();
//     }

//     public initRoutes() {
//         this.router.post(`${this.path}`, this.register)
//     }

//     register = async (req: Request, res: Response) => {
//         const { errors, isValid } = validateRegisterInput(req.body);

//         if (!isValid) {
//             return res.status(401).json(errors);
//         }

//         User.findOne({ email: req.body.email })
//             .then((user: any) => {
//                 if (user) {
//                     return res.status(400).json({ email: "Email already exists" });
//                 } else {
//                     const newUser = new User({
//                         name: req.body.name,
//                         email: req.body.email,
//                         password: req.body.password
//                     });

//                     bcrypt.genSalt(10, (err: Error, salt: any) => {
//                         bcrypt.hash(newUser.password, salt, (err: Error, hash: any) => {
//                             if (err) throw err;
//                             newUser.password = hash;
//                             newUser.save()
//                                 .then((user: any) => res.json(user))
//                                 .catch((err: Error) => console.log(err));
//                         })
//                     })
//                 }
//             })
//     }
// }

// export default RegisterController;
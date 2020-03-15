// import * as express from "express";
// import { Request, Response } from "express";
// import IControllerBase from "../interfaces/IControllerBase";
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const config = require("config");
// const User = require("../models/User");
// const validateLoginInput = require("../validation/login.validation");

// class LoginController implements IControllerBase {
//     public path = "/login";
//     public router = express.Router();
//     public name = "LoginController"
//     constructor() {
//         this.initRoutes();
//     }

//     public initRoutes() {
//         this.router.post(`${this.path}`, this.login);
//     }

//     login = async (req: Request, res: Response) => {
//         const { errors, isValid } = validateLoginInput(req.body);

//         if (!isValid) {
//             return res.status(401).json(errors);
//         }

//         const email: string = req.body.email;
//         const password: string = req.body.password;

//         User.findOne({ email })
//             .then((user: any) => {
//                 if (!user) {
//                     return res.status(401).json({ email: "Auth failed" });
//                 }

//                 bcrypt.compare(password, user.password)
//                     .then((isMatch: any) => {
//                         if (isMatch) {
//                             const payload = {
//                                 id: user.id,
//                                 name: user.name
//                             };

//                             jwt.sign(
//                                 payload,
//                                 config.get("secretOrKey"),
//                                 {
//                                     expiresIn: 1440
//                                 },
//                                 (err: Error, token: string) => {
//                                     res.json({
//                                         success: true,
//                                         token: "Token: " + token
//                                     })
//                                 }
//                             )
//                         } else {
//                             return res.status(401).json({ passwordincorrect: "Auth Failed" });
//                         }
//                     })

//             })
//     }
// }

// export default LoginController;

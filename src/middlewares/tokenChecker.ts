
import { Response } from "express";
const jwt = require("jsonwebtoken")
const config = require("config")

const tokenChecker = (req: any, res: Response, next: any) => {
    var token = req.headers['access-token'];

    if (token) {
        jwt.verify(token, config.get("secretOrKey"), (err: Error, decoded: string) => {
            if (err) {
                return res.json({ message: "invalid user token" });
            } else {
                req.decoded = decoded;
                next()
            }
        })
    } else {
        res.send({
            message: "No token Provided"
        })
    }
}

export default tokenChecker;

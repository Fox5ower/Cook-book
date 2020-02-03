import express from "express";
import { Request, Response } from "express";
import TokenBlackList from "../models/Token"
const jwt = require("jsonwebtoken")
const config = require("config")

const tokenChecker = async (req: any, res: Response, next: any) => {
    var token = req.headers['access-token'];

    if (token) {
        console.log(token);

        TokenBlackList.findOne({ token: token }, function (err: Error, obj: Object) {
            if (obj) {
                res.send({
                    message: "No token Provided"
                })
            } else {
                jwt.verify(token, config.get("adminSecretOrKey"), (err: Error, decoded: string) => {
                    if (err) {
                        return res.json({ message: "invalid token" });
                    } else {
                        req.decoded = decoded;
                        next()
                    }
                })
            }
        })
    } else {
        res.send({
            message: "No token Provided"
        })
    }

}

module.exports = tokenChecker
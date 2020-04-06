import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../interfaces/IControllerBase'
import ILike from '../interfaces/ILike';
const Dish = require('../models/Dish')
const User = require("../models/User");
const Like = require("../models/Like");
const Rating = require("../models/Rating");
const path = require('path')
import tokenChecker from '../middlewares/tokenChecker';


class DishActionsController implements IControllerBase {
    public path = '/user'
    public router = express.Router()
    public name = 'DishActionsController'

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.use(tokenChecker);
        this.router.post(`${this.path}/like`, this.like)
        this.router.post(`${this.path}/rating`, this.setRating)
    }
    like = async (req: Request, res: Response, next: any) => {
        if (req.body.action && req.body.dish_id && req.body.user_id) {
            const action = req.body.action;
            const dish_id = req.body.dish_id;
            const user_id = req.body.user_id;
            Dish.findOne({ id: dish_id }).then(() => {
                User.findOne({ id: user_id }).then(() => {
                    Like.findOne({ dish_id })
                        .then(async (existingLike: ILike) => {
                            if (!existingLike) {
                                const newLike = await new Like({
                                    dish_id,
                                    user_id,
                                    action
                                })
                                newLike.save();
                                res.status(200).json({ "action": action, "dish_id": dish_id })

                            } else {
                                const updatedLike = await Like.updateOne(
                                    { dish_id },
                                    {
                                        $set: {
                                            action
                                        }
                                    }
                                );
                                if (updatedLike) {
                                    res.status(200).json({ "action": action, "dish_id": dish_id });
                                } else {
                                    res.status(401).json({ message: 'Something went wrong' })
                                }
                            }
                        })
                })
            })

        } else {
            res.status(401).json({
                message: "Something went wrong"
            })
        }

    }
    setRating = async (req: Request, res: Response, next: any) => {
        if (req.body.rating && req.body.dish_id && req.body.user_id) {
            const rating = req.body.rating;
            const dish_id = req.body.dish_id;
            const user_id = req.body.user_id;

            Dish.findOne({ id: dish_id }).then(() => {
                User.findOne({ id: user_id }).then(() => {
                    Rating.findOne({ dish_id })
                        .then(async (existingRating: ILike) => {
                            if (!existingRating) {
                                const newRating = await new Rating({
                                    dish_id,
                                    user_id,
                                    rating
                                })
                                newRating.save();
                                res.status(200).json({ "rating": rating, "dish_id": dish_id })

                            } else {
                                const updatedRating = await Rating.updateOne(
                                    { dish_id },
                                    {
                                        $set: {
                                            rating
                                        }
                                    }
                                );
                                if (updatedRating) {
                                    res.status(200).json({ "rating": rating, "dish_id": dish_id });
                                } else {
                                    res.status(401).json({ message: 'Something went wrong' })
                                }
                            }
                        })
                })
            })

        } else {
            res.status(401).json({
                message: "Something went wrong"
            })
        }
    }
}

export default DishActionsController;
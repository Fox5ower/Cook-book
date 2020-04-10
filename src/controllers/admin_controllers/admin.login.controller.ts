import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../../interfaces/IControllerBase'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const Admin = require('../../models/Admin')
import validateLoginInput from '../../validation/login.validation'

class AdminLoginController implements IControllerBase {
  public path = '/admin/login'
  public router = express.Router()
  public name = 'AdminLoginController'

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.post(`${this.path}`, this.login)
    this.router.post(`${this.path}/check`, this.check)
  }

  check = async (req: Request, res: Response) => {
    const token = req.body.token;

    const dec = jwt.verify(
      token,
      config.secretOrKey,
      (err: Error, decoded: any) => {
        if (decoded) {
          console.log(decoded);
          Admin.findOne({ _id: decoded.id })
            .then((admin: any) => {
              console.log(admin)
              if (admin) {
                res.status(200).json({ isToken: true, id: decoded.id })
              }
            })
        } else {
          res.status(401).json({ isToken: false })
        }
      }
    )
  }

  login = async (req: Request, res: Response) => {
    const { errors, isValid } = validateLoginInput(req.body)

    if (!isValid) {
      return res.status(401).json(errors)
    }

    const email: string = req.body.email
    const password: string = req.body.password

    Admin.findOne({ email }).then((admin: any) => {
      if (!admin) {
        return res.status(401).json({ email: 'Auth failed' })
      }

      bcrypt.compare(password, admin.password).then((isMatch: any) => {
        if (isMatch) {
          const payload = {
            id: admin.id,
            name: admin.name,
            password: admin.password,
            email: admin.email
          }

          jwt.sign(
            payload,
            config.get('secretOrKey'),
            {
              expiresIn: 1440,
            },
            (err: Error, token: string) => {
              res.json({
                success: true,
                token: token,
                id: admin.id
              })
              req.headers['access-token'] = token
            }
          )
        } else {
          return res.status(401).json({ failed: 'Auth Failed' })
        }
      })
    })
  }
}

export default AdminLoginController

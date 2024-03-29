import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../../interfaces/IControllerBase'
import TokenBlackList from '../../models/Token'

class AdminLogoutController implements IControllerBase {
  public path = '/admin/logout'
  public router = express.Router()
  public name = 'AdminLogoutController'

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.post(`${this.path}`, this.logout)
  }

  logout = async (req: Request, res: Response) => {
    const badToken = new TokenBlackList({
      token: req.headers['access-token'],
    })

    const savedBadToken = await badToken.save()

    if (savedBadToken) {
      req.headers['access-token'] = ''
      res.json({ 'New Bad Token: ': savedBadToken })
    } else {
      res.status(401).json({ message: 'Something went wrong' })
    }
  }
}

export default AdminLogoutController

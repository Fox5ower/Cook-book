import express from 'express'
import { Application } from 'express'
import adminInitializer from './db_scripts/admin.initialize'
import dishInitializer from './db_scripts/dish.initialize'
import tokenBLInitializer from './db_scripts/tokenBlackList.initialize'
import categoryInitializer from './db_scripts/category.initialize'
import AdminController from './controllers/admin_controllers/admin.controller'
const mongoose = require('mongoose')

class App {
  public app: Application
  public port: string
  public mongoUri: string

  constructor(appInit: { port: string; mongoUri: string; middlewares: any; controllers: any }) {
    this.app = express()
    this.port = appInit.port
    this.mongoUri = appInit.mongoUri

    this.middlewares(appInit.middlewares)
    this.routes(appInit.controllers)
  }

  private routes(controllers: { forEach: (arg: (controller: any) => void) => void }) {
    controllers.forEach(controller => {
      if (
        controller.name == 'AdminLoginController' ||
        controller.name == 'DishController' ||
        controller.name == 'CategoryController' ||
        controller.name == 'LoginController' ||
        controller.name == 'RegisterController'
      ) {
        this.app.use('/', controller.router)
      } else {
        this.app.use('/api', controller.router)
      }
    })
  }

  private middlewares(middleWares: { forEach: (arg: (middleWare: any) => void) => void }) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare)
    })
  }

  public async dbConnect() {
    await mongoose
      .connect(this.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        adminInitializer
        categoryInitializer
        dishInitializer
        tokenBLInitializer
      })
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`This app is listening on http://localhost:${this.port}`)
    })
  }
}

export default App

import App from "./app";
import bodyParser from "body-parser";
import logger from "./middlewares/logger";
import AdminController from "./controllers/admin.controller";
import RegisterController from "./controllers/register.controller";
import LoginController from "./controllers/login.controller";
import AdminLoginController from "./controllers/admin.login.controller";
const config = require("config");
const passport = require("passport");
require("../config/passport")(passport);

const app = new App({
    port: config.get("port"),
    mongoUri: `${config.get("mongoUri")}${config.get("dbName")}`,
    controllers: [
        new AdminController(),
        new AdminLoginController(),
        new RegisterController(),
        new LoginController()
    ],

    middlewares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        logger,
        passport.initialize(),

    ]
})

app.mongoConnect()

app.listen()
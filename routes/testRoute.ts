import * as express from "express";
const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    res.json({
        Admin: {
            name: "Admin",
            password: "1a11A1"
        }
    });
})

module.exports = router;
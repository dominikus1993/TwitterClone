import {login, register} from  "../user/controller";
import {getDefaultUserService} from "./dependencies";
import {Router} from "express";

const router = Router();
const userService = getDefaultUserService();

router.get("/*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true");
    next(); // http://expressjs.com/guide.html#passing-route control
});

router.post("/user/register", register(userService));
router.post("/user/login", login(userService));
export default router;

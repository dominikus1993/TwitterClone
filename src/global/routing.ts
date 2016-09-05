import {UserController} from  "../user/controller";
import {getDefaultUserService} from "./dependencies";
import {Router} from "express";

export function setRouting() {
    const router = Router();
    const userController = new UserController(getDefaultUserService());

    router.get("/*", (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
        res.header("Access-Control-Allow-Credentials", "true");
        next(); // http://expressjs.com/guide.html#passing-route control
    });

    router.post("/user/register", userController.register);

    return router;
}

export const routing = setRouting();

export default routing;

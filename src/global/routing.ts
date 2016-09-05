import {UserController} from  "../user/controller";
import {Router} from "express";

export function setRouting(router: Router) {
    router.get("/*", (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
        res.header("Access-Control-Allow-Credentials", "true");
        next(); // http://expressjs.com/guide.html#passing-route control
    });
}

import {wrapResult} from "../global/result";
import {IUserService} from "./service";
import {Request, Response} from "express";

export function register(userService: IUserService) {
    return async function(req: Request, res: Response, next: Function) {
        const userObj: {username: string, email: string, password: string, passwordConfirm: string} = req.body;
        try {
            const user = await userService.register(userObj);
            res.status(200).json(user).end();
        } catch (error) {
            res.status(404).json(wrapResult(error)).end();
        }
    };
}

import {httpStatuses} from "../global/constants";
import {wrapResult} from "../global/result";
import {IUserService} from "./service";
import {Request, Response} from "express";

export function register(userService: IUserService) {
    return async function(req: Request, res: Response, next: Function) {
        const userObj: { username: string; email: string; password: string; passwordConfirm: string } = req.body;
        try {
            const user = await userService.register(userObj);
            res.status(httpStatuses.OK).json(user).end();
        } catch (error) {
            res.status(httpStatuses.NOT_FOUND).json(wrapResult(null, error)).end();
        }
    };
}

import {httpStatuses} from "../global/constants";
import {wrapResult} from "../global/result";
import {IUserService} from "./service";
import {Request, Response} from "express";

export function register(userService: IUserService) {
    return async (req: Request, res: Response, next: Function) => {
        const userObj: { username: string; email: string; password: string; passwordConfirm: string } = req.body;
        try {
            const user = await userService.register(userObj);
            res.status(httpStatuses.OK).json(user).end();
        } catch (error) {
            res.status(httpStatuses.NOT_FOUND).json(wrapResult(null, error)).end();
        }
    };
}

export function login(userService: IUserService) {
    return async (req: Request, res: Response, next: Function) => {
        const user: {username: string, password: string} = req.body;
        try {
            const loginResult = await userService.login(user);
            res.status(httpStatuses.OK).json(loginResult).end();
        } catch (error) {
            res.status(httpStatuses.NOT_FOUND).json(wrapResult(null, error)).end();
        }
    };
}

export function isLogged(userService: IUserService) {
    return async (req: Request, res: Response, next: Function) => {
        const authorization = req.headers["authorization"] || "";
        try {
            const isLoggedResult = await userService.isLogged({token: authorization} as any);
            if (isLoggedResult.isSuccess) {
                (req as any).user = isLoggedResult.value;
                next();
            } else {
                res.status(httpStatuses.NOT_FOUND).json(isLoggedResult);
            }
        } catch (error) {
            res.status(httpStatuses.NOT_FOUND).json(error);
        }
    };
}

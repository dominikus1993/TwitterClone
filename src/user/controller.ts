import {wrapResult} from "../global/result";
import {IUserService} from "./service";
import {Request, Response} from "express";

export class UserController {
    constructor(private userService: IUserService) {

    }

    public async login(req: Request, res: Response, next: Function) {
        next();
    }

    public async register(req: Request, res: Response, next: Function) {
        const userObj: {username: string, email: string, password: string, passwordConfirm: string} = req.body;
        try {
            const user = await this.userService.register(userObj);
            res.status(200).json(user).end();
        } catch (error) {
            res.status(404).json(wrapResult(error)).end();
        }
    }
}

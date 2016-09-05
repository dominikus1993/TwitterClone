import {IUserService} from "./service";
import {Request, Response} from "express";

export class UserController {
    constructor(private userService: IUserService) {

    }

    public login(req: Request, res: Response, next: Function) {
        next();
    }
}

import {IUserService} from "./service";
import {Request, Response} from "express";

export class UserController {
    constructor(private userService: IUserService) {

    }

    public async login(req: Request, res: Response, next: Function) {
        next();
    }

    public async register(req: Request, res: Response, next: Function) {
        next();
    }
}

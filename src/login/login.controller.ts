import 'reflect-metadata';
import {controller, request, response} from "inversify-express-utils";
import {Request, Response} from "express";
import {AuthMiddleware} from "../middleware/authentication/auth.middleware";
import {UserService} from "../user/user.service";
import {Id} from "../models/id.model";
import {HttpStatusCode} from "../models/httpStatus.model";

@controller('/login')
export class LoginController {
    constructor(private authMiddleware: AuthMiddleware, private userService: UserService) {
    }

    public async authenticateUser(@request() req: Request, @response() res: Response): Promise<void> {
        const id = req.body.id;
        const user = await this.userService.getById(new Id(id));
        const token = this.authMiddleware.getTokenFor(user);
        res.status(HttpStatusCode.Ok).send({token});
    }
}

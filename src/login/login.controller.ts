import 'reflect-metadata';
import {controller, request, response} from "inversify-express-utils";
import {Request, Response} from "express";
import {AuthenticationService} from "../middleware/authentication/authentication.service";
import {UserService} from "../user/user.service";
import {Id} from "../models/id.model";
import {HttpStatusCode} from "../models/httpStatus.model";
import {inject} from "inversify";

@controller('/login')
export class LoginController {
    constructor(@inject('AuthenticationService') private authMiddleware: AuthenticationService, @inject('UserService') private userService: UserService) {
    }

    public async authenticateUser(@request() req: Request, @response() res: Response): Promise<void> {
        const id = req.body.id;
        const user = await this.userService.getById(new Id(id));
        const token = this.authMiddleware.getTokenFor(user);
        res.status(HttpStatusCode.Ok).send({token});
    }
}

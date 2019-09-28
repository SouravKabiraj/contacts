import 'reflect-metadata';
import {controller, httpPost, request, response} from "inversify-express-utils";
import {Request, Response} from "express";
import {AuthenticationService} from "../middleware/authentication/authentication.service";
import {UserService} from "../user/user.service";
import {Id} from "../models/id.model";
import {HttpStatusCode} from "../models/httpStatus.model";
import {inject} from "inversify";
import {PasswordUtility} from "../utilities/password.utility";
import {Error, ErrorType} from "../models/error.model";

@controller('/login')
export class LoginController {
    constructor(@inject('AuthenticationService') private authMiddleware: AuthenticationService, @inject('UserService') private userService: UserService) {
    }

    @httpPost('')
    public async authenticateUser(@request() req: Request, @response() res: Response): Promise<void> {
        const id = req.body.id;
        const password = req.body.password;

        const user = await this.userService.getById(new Id(id));
        if (user) {
            if (PasswordUtility.check(password, user.password)) {
                const token = this.authMiddleware.getTokenFor(user);
                res.status(HttpStatusCode.Ok).send({token});
            } else {
                res.status(HttpStatusCode.BadRequest).send(new Error(ErrorType.AUTHENTICATION_ERROR, 'Invalid userID and password.'));
            }
        } else {
            res.status(HttpStatusCode.BadRequest).send(new Error(ErrorType.AUTHENTICATION_ERROR, 'Invalid userID and password.'));
        }
    }
}

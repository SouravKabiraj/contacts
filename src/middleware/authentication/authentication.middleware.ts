import {Request, Response} from "express";
import {AuthenticationService} from "./authentication.service";
import {HttpStatusCode} from "../../models/httpStatus.model";
import {inject, injectable} from "inversify";
import {Error, ErrorType} from "../../models/error.model";
import {whiteListedApis} from "../../config/api.config";
import {Id} from "../../models/id.model";

@injectable()
export class AuthenticationMiddleware {
    constructor(@inject('AuthenticationService') private authenticationService: AuthenticationService) {
    }

    public authenticate(req: Request, res: Response, next: any): void {
        const isWhiteListedRequest = whiteListedApis.some(api => (req.url === api.url && req.method === api.method));
        isWhiteListedRequest ? next() : this.verify(req, res, next);
    }

    private verify(req: Request, res: Response, next: any): void {
        const token = req.body.token || req.headers['x-access-token'];
        const userId = new Id(req.query['userId']);
        if (token && userId) {
            const payloadUser = this.authenticationService.getUser(token);
            if (Id.isEqual(payloadUser._id, userId)) {
                next();
            } else {
                res.status(HttpStatusCode.Forbidden).send(new Error(ErrorType.AUTHENTICATION_ERROR, 'Invalid UserId.'));
            }
        } else {
            res.status(HttpStatusCode.Forbidden).send(new Error(ErrorType.AUTHENTICATION_ERROR, 'Missing UserID or Token.'));
        }
    }
}

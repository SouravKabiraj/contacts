import {Error, ErrorType} from "../../models/error.model";
import {Request, Response} from "express";
import {Id} from "../../models/id.model";
import {AuthenticationService} from "./authentication.service";
import {HttpStatusCode} from "../../models/httpStatus.model";
import {whiteListedApis} from "../../config/api.config";
import {inject, injectable} from "inversify";

@injectable()
export class AuthenticationMiddleware {
    constructor(@inject('AuthenticationService') private authenticationService: AuthenticationService) {
    }

    public authenticate(err: Error, req: Request, res: Response, next: any): void {
        const isWhiteListedRequest = whiteListedApis.some(api => (req.baseUrl.includes(api.url) && req.method === api.method));
        isWhiteListedRequest ? next() : this.verify(req, res, next);
    }

    private verify(req: Request, res: Response, next: any): void {
        const token = req.body.token || req.query['x-access-token'];
        const userId = new Id(req.query['userId']);
        if (token && userId) {
            const payloadUser = this.authenticationService.validateToken(token);
            if (payloadUser._id === userId) {
                next();
            } else {
                res.status(HttpStatusCode.Forbidden).send(new Error(ErrorType.AUTHENTICATION_ERROR, 'Invalid UserId.'));
            }
        } else {
            res.status(HttpStatusCode.Forbidden).send(new Error(ErrorType.AUTHENTICATION_ERROR, 'Missing UserID or Token.'));
        }
    }
}

import {NextFunction, Request, Response} from "express";
import {AuthenticationService} from "./authentication.service";
import {HttpStatusCode} from "../../models/httpStatus.model";
import {inject, injectable} from "inversify";
import {interfaces, next} from "inversify-express-utils";
import {Principal} from "./authentication.principal";
import {Error, ErrorType} from "../../models/error.model";
import {whiteListedApis} from "../../config/api.config";
import {LoggerUtility} from "../../utilities/logger.utility";

@injectable()
export class AuthenticationMiddleware implements interfaces.AuthProvider {
    // constructor(@inject('AuthenticationService') private authenticationService: AuthenticationService) {
    // }
    //
    // public authenticate(req: Request, res: Response, next: any): void {
    //     LoggerUtility.logInfo(JSON.stringify(req));
    //     const isWhiteListedRequest = whiteListedApis.some(api => (req.baseUrl.includes(api.url) && req.method === api.method));
    //     isWhiteListedRequest ? next() : this.verify(req, res, next);
    // }
    //
    // private verify(req: Request, res: Response, next: any): void {
    //     const token = req.body.token || req.query['x-access-token'];
    //     const userId = new Id(req.query['userId']);
    //     if (token && userId) {
    //         const payloadUser = this.authenticationService.validateToken(token);
    //         if (payloadUser._id === userId) {
    //             next();
    //         } else {
    //             res.status(HttpStatusCode.Forbidden).send(new Error(ErrorType.AUTHENTICATION_ERROR, 'Invalid UserId.'));
    //         }
    //     } else {
    //         res.status(HttpStatusCode.Forbidden).send(new Error(ErrorType.AUTHENTICATION_ERROR, 'Missing UserID or Token.'));
    //     }
    // }

    public async getUser(req: Request, res: Response, next: NextFunction): Promise<interfaces.Principal> {
        const token = req.query['x-access-token'] || ((req.body) ? req.body.token : null);
        const method = req.method;
        const url = req.baseUrl;
        const userId = req.query['userId'];
        const principal = new Principal({token, userId, url, method});
        return principal;
    }
}

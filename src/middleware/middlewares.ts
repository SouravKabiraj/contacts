import {ErrorMiddleware} from "./error.middleware";
import '../middleware/authentication/authentication.middleware';
import {LoggerUtility} from "../utilities/logger.utility";
import {Router} from "express";
import {container} from "../config/express-container.config";
import {AuthenticationMiddleware} from "./authentication/authentication.middleware";

export function addMiddleware(app) {
    LoggerUtility.logInfo('Adding Middleware');
    app.use(ErrorMiddleware.handle);
}

export function getCustomRouter(): Router {
    const authenticationMiddleware = container.get<AuthenticationMiddleware>('AuthenticationMiddleware');
    return Router().use((req, res, next) => authenticationMiddleware.authenticate(req, res, next));
}

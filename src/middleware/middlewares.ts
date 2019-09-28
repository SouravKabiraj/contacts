import {ErrorMiddleware} from "./error.middleware";
import {AuthenticationMiddleware} from "./authentication/authentication.middleware";
import '../middleware/authentication/authentication.middleware';
import {container} from "../config/express-container.config";
import {LoggerUtility} from "../utilities/logger.utility";

const authenticationMiddleware = container.get(AuthenticationMiddleware);

export function addMiddleware(app) {
    LoggerUtility.logInfo('Adding Error Handler and Authentication Middleware');
    app.use(ErrorMiddleware.handle);
    app.use(authenticationMiddleware.authenticate);
}

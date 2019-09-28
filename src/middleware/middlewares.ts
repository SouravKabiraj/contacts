import {ErrorMiddleware} from "./error.middleware";
import {AuthenticationMiddleware} from "./authentication/authentication.middleware";
import '../middleware/authentication/authentication.middleware';
import {container} from "../config/express-container.config";
import {LoggerUtility} from "../utilities/logger.utility";

export function addMiddleware(app) {
    LoggerUtility.logInfo('Adding Middleware');
    app.use(ErrorMiddleware.handle);
}

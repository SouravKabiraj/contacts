import {ErrorMiddleware} from "./error.middleware";
import '../middleware/authentication/authentication.middleware';
import {LoggerUtility} from "../utilities/logger.utility";

export function addMiddleware(app) {
    LoggerUtility.logInfo('Adding Middleware');
    app.use(ErrorMiddleware.handle);
}

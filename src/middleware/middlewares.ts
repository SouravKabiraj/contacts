import {ErrorMiddleware} from "./error.middleware";
import {AuthenticationMiddleware} from "./authentication/authentication.middleware";
import '../middleware/authentication/authentication.middleware';
import {container} from "../config/express-container.config";

const authenticationMiddleware = container.get(AuthenticationMiddleware);

export function addMiddleware(app) {
    app.use(ErrorMiddleware.handle);
    app.use(authenticationMiddleware.authenticate);
}

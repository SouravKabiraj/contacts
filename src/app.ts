import 'reflect-metadata';
import {Router} from "express";
import {port} from "./config/api.config";
import * as bodyParser from 'body-parser';
import {addMiddleware} from "./middleware/middlewares";
import {LoggerUtility} from "./utilities/logger.utility";
import {container} from "./config/express-container.config";
import {InversifyExpressServer} from 'inversify-express-utils';
import {AuthenticationMiddleware} from "./middleware/authentication/authentication.middleware";

const authenticationMiddleware = container.get<AuthenticationMiddleware>('AuthenticationMiddleware');

// create server
const customRouter = Router().use((req, res, next) => authenticationMiddleware.authenticate(req, res, next));
let server = new InversifyExpressServer(container, customRouter);
server.setConfig((app) => {
    // add body parser
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
});

let app = server.build();
addMiddleware(app);
app.listen(port);
LoggerUtility.logSuccess('Server started successfully.');
LoggerUtility.logInfo(`Server is listening on port [${port}].`);

import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import {InversifyExpressServer} from 'inversify-express-utils';

import {container} from "./config/express-container.config";
import {ErrorMiddleware} from "./middleware/error.middleware";
import {LoggerUtility} from "./utilities/logger.utility";

// create server
let server = new InversifyExpressServer(container);
server.setConfig((app) => {
    // add body parser
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
});

let app = server.build();
app.use(ErrorMiddleware.handle);
app.listen(3000);
LoggerUtility.logSuccess('Server started successfully.');
LoggerUtility.logInfo('Server is listening on port [3000].');

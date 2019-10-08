import 'reflect-metadata';
import {port} from "./config/api.config";
import * as bodyParser from 'body-parser';
import {addMiddleware, getCustomRouter} from "./middleware/middlewares";
import {LoggerUtility} from "./utilities/logger.utility";
import {container} from "./config/express-container.config";
import {InversifyExpressServer} from 'inversify-express-utils';

// create server
let server = new InversifyExpressServer(container, getCustomRouter());
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

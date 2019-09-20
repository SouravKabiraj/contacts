import 'reflect-metadata';
import * as bodyParser from 'body-parser';

const errorhandler = require('errorhandler');

import {InversifyExpressServer} from 'inversify-express-utils';

import {container} from "./config/express-container.config";
import {HttpStatusCode} from "./models/httpStatus.model";
import {ErrorUtility} from "./utilities/error.utility";

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
app.use(ErrorUtility.handle);
app.listen(3000);

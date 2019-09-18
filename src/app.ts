import 'reflect-metadata';
import * as bodyParser from 'body-parser';

import {Container} from 'inversify';
import {InversifyExpressServer} from 'inversify-express-utils';

// declare metadata by @controller annotation
import "./contact/contact.controller";
import {ContactService} from "./contact/contact.service";
import {ContactRepository} from "./contact/contact.repository";

// set up container
let container = new Container();

// set up bindings
container.bind<ContactService>('ContactService').to(ContactService);
container.bind<ContactRepository>('ContactRepository').to(ContactRepository);

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
app.listen(3000);

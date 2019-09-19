import {Container} from "inversify";
import {ContactService} from "../contact/contact.service";
import {ContactRepository} from "../contact/contact.repository";

import "../contact/contact.controller";


export const container = new Container();

// set up bindings
container.bind<ContactService>('ContactService').to(ContactService);
container.bind<ContactRepository>('ContactRepository').to(ContactRepository);

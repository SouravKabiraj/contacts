import {Container} from "inversify";
import {ContactService} from "../contact/contact.service";
import {ContactRepository} from "../contact/contact.repository";

import "../contact/contact.controller";
import '../user/user.controller';
import {UserService} from "../user/user.service";
import {UserRepository} from "../user/user.repository";


export const container = new Container();

// set up bindings
container.bind<ContactService>('ContactService').to(ContactService);
container.bind<UserService>('UserService').to(UserService);

container.bind<ContactRepository>('ContactRepository').to(ContactRepository);
container.bind<UserRepository>('UserRepository').to(UserRepository);

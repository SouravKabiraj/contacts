import {Container} from "inversify";
import {UserService} from "../user/user.service"
import {UserRepository} from "../user/user.repository";
import {ContactService} from "../contact/contact.service";
import {ContactRepository} from "../contact/contact.repository";
import {AuthenticationService} from "../middleware/authentication/authentication.service";
import {AuthenticationMiddleware} from "../middleware/authentication/authentication.middleware";

// ADD ALL CONTROLLER
import "../contact/contact.controller";
import '../user/user.controller';
import '../login/login.controller';
import '../middleware/authentication/authentication.middleware';


export const container = new Container({autoBindInjectable: true});

// ADD ALL Middleware
container.bind<AuthenticationMiddleware>('AuthenticationMiddleware').to(AuthenticationMiddleware);

// ADD ALL SERVICE
container.bind<AuthenticationService>('AuthenticationService').to(AuthenticationService);
container.bind<ContactService>('ContactService').to(ContactService);
container.bind<UserService>('UserService').to(UserService);

// ADD ALL REPOSITORY
container.bind<ContactRepository>('ContactRepository').to(ContactRepository);
container.bind<UserRepository>('UserRepository').to(UserRepository);

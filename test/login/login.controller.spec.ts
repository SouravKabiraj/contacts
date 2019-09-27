import 'reflect-metadata';
import {suite, test} from "mocha-typescript";
import {deepEqual, instance, mock, when} from "ts-mockito";
import {AuthenticationService} from "../../src/middleware/authentication/authentication.service";
import {UserService} from "../../src/user/user.service";
import * as httpMocks from "node-mocks-http";
import {User} from "../../src/user/user.model";
import {Id} from "../../src/models/id.model";
import {HttpStatusCode} from "../../src/models/httpStatus.model";
import {LoginController} from "../../src/login/login.controller";
import {expect} from 'chai';

@suite
class LoginControllerSpec {
    private targetObject: LoginController;
    private authMiddleware = mock(AuthenticationService);
    private userService = mock(UserService);

    constructor() {
        this.targetObject = new LoginController(instance(this.authMiddleware), instance(this.userService));
    }

    @test
    private async shouldReturnAccessToken(): Promise<void> {
        const request = httpMocks.createRequest({body: {id: '123456789012', password: '1234509876'}});
        const response = httpMocks.createResponse();
        const user = new User('mailid', 'name', '+91 3253523523');

        when(this.userService.getById(deepEqual(new Id('123456789012')))).thenResolve(user);
        when(this.authMiddleware.getTokenFor(user)).thenReturn('header.payload.secret');

        await this.targetObject.authenticateUser(request, response);

        expect(response._getStatusCode()).to.equals(HttpStatusCode.Ok);
        expect(response._getData()).to.deep.equals({token: 'header.payload.secret'});
    }
}

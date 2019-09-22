import 'reflect-metadata';
import {suite, test} from "mocha-typescript";
import {UserController} from "../../src/user/user.controller";
import {UserService} from "../../src/user/user.service";
import {deepEqual, instance, mock, verify, when} from "ts-mockito";
import * as httpMocks from "node-mocks-http";
import {User} from "../../src/user/user.model";
import {HttpStatusCode} from "../../src/models/httpStatus.model";
import {expect} from 'chai';
import {Id} from "../../src/models/id.model";
import {PasswordUtility} from "../../src/utilities/password.utility";

@suite
class UserControllerSpec {
    private targetObject: UserController;
    private userService = mock(UserService);

    constructor() {
        this.targetObject = new UserController(instance(this.userService));
    }

    @test
    private async shouldCreateNewUser(): Promise<void> {
        const user = new User('suihd', 'jsdhf', 'hjfgew');
        user.password = 'password';
        const request = httpMocks.createRequest({
            body: user
        });
        const response = httpMocks.createResponse();

        await this.targetObject.create(request, response);

        user.password = PasswordUtility.encrypt(user.password);
        verify(this.userService.create(user)).once();
        expect(response._getStatusCode()).to.equals(HttpStatusCode.Created);
    }

    @test
    public async shouldGetUserById(): Promise<void> {
        const responseMockResponse = httpMocks.createResponse();
        const user = new User('qwhr', 'guqwe', '763');
        when(this.userService.getById(deepEqual(new Id('123456789012')))).thenResolve(user)

        await this.targetObject.getById('123456789012', responseMockResponse);

        expect(responseMockResponse._getStatusCode()).to.equals(HttpStatusCode.Ok);
        expect(responseMockResponse._getData()).to.equals(user);
    }
}

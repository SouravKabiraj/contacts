import 'reflect-metadata';
import {suite, test} from "mocha-typescript";
import {ContactController} from "../../src/contact/contact.controller";
import {Contact} from "../../src/contact/contact.model";
import {Name} from "../../src/models/name.model";
import {anything, deepEqual, instance, mock, verify, when} from "ts-mockito";
import {ContactService} from "../../src/contact/contact.service";
import {Id} from "../../src/models/id.model";
import * as httpMocks from 'node-mocks-http';
import {expect} from 'chai';
import {HttpStatusCode} from "../../src/models/httpStatus.model";

@suite
class ContactControllerSpec {
    private targetObject: ContactController;
    private contactService = mock(ContactService);

    constructor() {
        this.targetObject = new ContactController(instance(this.contactService));
    }

    @test
    private async shouldCreateNewContact(): Promise<void> {
        const contact = new Contact(new Name('first', null, 'last'), new Id(), '+91 23478923794', 'test@kabiraj.com', 'ABC pub. ltd.');
        const mockRequest = httpMocks.createRequest({
            body: contact
        });
        let response = httpMocks.createResponse();

        await this.targetObject.create(mockRequest, response);

        verify(this.contactService.create(deepEqual(contact))).once();
    }

    @test
    public async shouldUpdateWhileIdIsProper(): Promise<void> {
        const id = new Id();
        const contact = new Contact(new Name('first', null, 'last'), new Id(), '+91 23478923794', 'test@kabiraj.com', 'ABC pub. ltd.');
        contact.id = id;

        const mockRequest = httpMocks.createRequest({
            body: contact
        });
        const response = httpMocks.createResponse();

        await this.targetObject.update(id, mockRequest, response);

        verify(this.contactService.update(contact)).once();
        expect(response._getStatusCode()).to.deep.equal(HttpStatusCode.Ok);
    }

    @test
    public async shouldReturnBadRequestWhileIdIsNotProper(): Promise<void> {
        const id = new Id();
        const contact = new Contact(new Name('first', null, 'last'), new Id(), '+91 23478923794', 'test@kabiraj.com', 'ABC pub. ltd.');
        contact.id = new Id();

        const mockRequest = httpMocks.createRequest({
            body: contact
        });
        const response = httpMocks.createResponse();

        await this.targetObject.update(id, mockRequest, response);

        verify(this.contactService.update(contact)).never();
        expect(response._getStatusCode()).to.deep.equal(HttpStatusCode.BadRequest);
    }

    @test
    public async shouldFetchContactById(): Promise<void> {
        const id = new Id();
        const response = httpMocks.createResponse();
        const contact = new Contact(anything(), anything(), anything());

        when(this.contactService.getById(id)).thenResolve(contact);

        await this.targetObject.getById(id, response);

        expect(response._getData()).to.equal(contact);
        expect(response._getStatusCode()).to.deep.equal(HttpStatusCode.Ok);
    }

    @test
    public async shouldFetchContactsForUser(): Promise<void> {
        const responseMock = httpMocks.createResponse();
        const contactListForUser = anything();
        const userId = new Id();
        when(this.contactService.getFor(userId)).thenResolve(contactListForUser);

        await this.targetObject.getByUserId(userId, responseMock);

        expect(responseMock._getData()).to.equal(contactListForUser);
    }
}

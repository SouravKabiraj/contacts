import 'reflect-metadata';
import {suite, test} from "mocha-typescript";
import {ContactController} from "../../src/contact/contact.controller";
import {Contact} from "../../src/contact/contact.model";
import {Name} from "../../src/models/name.model";
import {instance, mock, verify} from "ts-mockito";
import {ContactService} from "../../src/contact/contact.service";

@suite
class ContactControllerSpec {
    private targetObject: ContactController;
    private contactService = mock(ContactService);

    constructor() {
        this.targetObject = new ContactController(instance(this.contactService));
    }

    @test
    private async shouldCreateNewContact(): Promise<void> {
        const contact = new Contact(new Name('first', null, 'last'), 'user1', '+91 23478923794', 'test@kabiraj.com', 'ABC pub. ltd.');

        await this.targetObject.create(contact);

        verify(this.contactService.create(contact)).once();
    }

    @test
    public async shouldFetchAllContactsForSpecificUserId(): Promise<void> {
    }
}

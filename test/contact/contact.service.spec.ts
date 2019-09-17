import 'reflect-metadata';
import {suite, test} from "mocha-typescript";
import {ContactService} from "../../src/contact/contact.service";
import {Contact} from "../../src/contact/contact.model";
import {Name} from "../../src/models/name.model";
import {instance, mock, verify} from "ts-mockito";
import {ContactRepository} from "../../src/contact/contact.repository";

@suite
class ContactServiceSpec {
    private targetObject: ContactService;
    private contactRepository = mock(ContactRepository);

    constructor() {
        this.targetObject = new ContactService(instance(this.contactRepository));
    }

    @test
    private async shouldCreateNewContact(): Promise<void> {
        let contact = new Contact(new Name('First', null, 'User'), 'user2', '+12 979812632137', 'email@outlook.xom', 'NA');

        await this.targetObject.create(contact);

        verify(this.contactRepository.save(contact)).once();
    }
}

import 'reflect-metadata';
import {suite, test} from "mocha-typescript";
import {ContactService} from "../../src/contact/contact.service";
import {Contact} from "../../src/contact/contact.model";
import {Name} from "../../src/models/name.model";
import {anything, instance, mock, verify, when} from "ts-mockito";
import {ContactRepository} from "../../src/contact/contact.repository";
import {Id} from "../../src/models/id.model";
import {expect} from 'chai';

@suite
class ContactServiceSpec {
    private targetObject: ContactService;
    private contactRepository = mock(ContactRepository);

    constructor() {
        this.targetObject = new ContactService(instance(this.contactRepository));
    }

    @test
    private async shouldCreateNewContact(): Promise<void> {
        let contact = new Contact(new Name('First', null, 'User'), 'new Id()', '+12 979812632137', 'email@outlook.xom', 'NA');

        await this.targetObject.create(contact);

        verify(this.contactRepository.save(contact)).once();
    }

    @test
    public async shouldUpdateContact(): Promise<void> {
        const contact = new Contact(new Name('first', null, 'last'), 'new Id()', '+92 632647823', 'sjd@dj.com');

        await this.targetObject.update(contact);

        verify(this.contactRepository.update(contact)).once();
    }

    @test
    public async shouldFetchContactById(): Promise<void> {
        const id = new Id();
        const contact = new Contact(anything(), anything(), anything());

        when(this.contactRepository.getById(id)).thenResolve(contact);

        const fetchedContact = await this.targetObject.getById(id);

        expect(fetchedContact).to.equal(contact);
    }

    @test
    public async shouldFetchContactsOfUser(): Promise<void> {
        const userId = 'new Id()';
        const contacts = anything();

        when(this.contactRepository.getByUserId(userId)).thenResolve(contacts);

        const fetchedContacts = await this.targetObject.getFor(userId);

        expect(fetchedContacts).to.equal(contacts);
    }
}

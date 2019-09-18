import 'reflect-metadata';
import {suite, test} from "mocha-typescript";
import {ContactRepository} from "../../src/contact/contact.repository";
import {Contact, ContactModel} from "../../src/contact/contact.model";
import {Name} from "../../src/models/name.model";
import {expect} from 'chai';
import {BaseRepositorySpec} from "../base/base.repository.spec";
import {MongoUtility} from "../../src/utilities/mongo.utility";
import {Id} from "../../src/models/id.model";

@suite
class ContactRepositorySpec extends BaseRepositorySpec {
    private targetObject: ContactRepository;

    constructor() {
        super();
        this.targetObject = new ContactRepository()
    }

    @test
    private async shouldSaveNewContact(): Promise<void> {
        const contactCount = await ContactModel.countDocuments();
        const contact = new Contact(new Name('wef', '', 'safasf'), new Id(), 'asfasf');

        await this.targetObject.save(contact);

        const actualCount = await ContactModel.countDocuments();
        expect(actualCount).to.equal(contactCount + 1);
    }

    @test
    public async shouldUpdateContact(): Promise<void> {
        const contact = new Contact(new Name('wef', '', 'safasf'), new Id(), 'asfasf', '', '');
        await ContactModel.create(contact);
        const updatedContact = new Contact(new Name('uerweiouroiw', '', 'safasf'), new Id(), 'asfasf', '', '');
        updatedContact._id = contact._id;

        await this.targetObject.update(updatedContact);

        const foundDocument = await ContactModel.findById(contact._id);
        const leanDocument = MongoUtility.getLeanDocument<Contact>(foundDocument);
        expect(leanDocument).to.deep.equal(updatedContact);
    }

    @test
    public async shouldFetchContactById(): Promise<void> {
        const contact = new Contact(new Name('wef', '', 'safasf'), new Id(), 'asfasf', '', '');
        await ContactModel.create(contact);

        const fetchedContact = await this.targetObject.getById(contact._id);

        expect(fetchedContact).to.deep.equal(contact);
    }

    @test
    public async shouldFetchContactsByUserId(): Promise<void> {
        const userId = new Id();
        const contact1 = new Contact(new Name('wef', '', 'safasf'), userId, 'asfasf', '', '');
        const contact2 = new Contact(new Name('wef', '', 'safasf'), userId, 'asfasf', '', '');
        const contact3 = new Contact(new Name('wef', '', 'safasf'), userId, 'asfasf', '', '');

        await ContactModel.create(contact1);
        await ContactModel.create(contact2);
        await ContactModel.create(contact3);

        const contacts = await this.targetObject.getByUserId(userId);

        expect(contacts).to.deep.include(contact1);
    }
}

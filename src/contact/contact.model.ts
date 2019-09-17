import {Name} from "../models/name.model";
import {prop, Typegoose} from 'typegoose';
import {anything} from "ts-mockito";


export class Contact extends Typegoose {
    @prop() private _id: string;
    @prop() private name: Name;
    @prop() private emailId: string;
    @prop() private phoneNumber: string;
    @prop() private company: string;
    @prop() private userId: string;

    constructor(name: Name, userId: string, phoneNumber: string, emailId?: string, company?: string) {
        super();
        this.name = name;
        this.emailId = emailId;
        this.phoneNumber = phoneNumber;
        this.company = company;
        this.userId = userId;
    }
}

const ContactModel = new Contact(anything(), anything(), anything(), anything(), anything()).getModelForClass(Contact);

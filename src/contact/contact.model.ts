import {Name} from "../models/name.model";

class Contact {
    private _id: string;
    private name: Name;
    private emailId: string;
    private phoneNumber: string;
    private company: string;
    private userId: string;

    constructor(name: Name, emailId: string, phoneNumber: string, company: string, userId: string) {
        this.name = name;
        this.emailId = emailId;
        this.phoneNumber = phoneNumber;
        this.company = company;
        this.userId = userId;
    }
}

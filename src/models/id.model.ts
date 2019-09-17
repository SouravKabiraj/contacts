import {ObjectID} from 'mongodb';

export class Id extends ObjectID {

    constructor(id?: string | number | ObjectID) {
        super(id);
    }

    public static isEqual(id: ObjectID | string, otherId: ObjectID | string): boolean {
        if (id === null && otherId === null) {
            return true;
        } else if (id === undefined && otherId === undefined) {
            return true;
        }
        try {
            return new ObjectID(id).equals(new ObjectID(otherId));
        } catch (error) {
            return false;
        }
    }
}

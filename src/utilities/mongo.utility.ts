export class MongoUtility {
    public static getLeanDocument<T>(document: any): T {
        delete document._doc.__v;
        const object: T = document._doc;
        return object;
    }
}

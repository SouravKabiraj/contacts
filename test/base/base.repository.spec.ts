import './../config/db.config';
import {connectTestDatabase, disconnectTestDatabase} from "../config/db.config";

export class BaseRepositorySpec {

    public async before(): Promise<void> {
        await connectTestDatabase();
    }

    public async after(): Promise<void> {
        await disconnectTestDatabase();
    }
}

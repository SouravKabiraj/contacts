import {cryptr} from "../config/sha.config";
import {User} from "../user/user.model";
import {LoggerUtility} from "./logger.utility";

export class PasswordUtility {
    public static encrypt(password: string): string {
        return cryptr.encrypt(password);
    }

    public static check(password: string, hash: string): boolean {
        return (cryptr.decrypt(hash) === password);
    }

    public static getPasswordEncryptedUser(user: User): User {
        user.password = PasswordUtility.encrypt(user.password);
        LoggerUtility.logDebug(JSON.stringify(user));
        const encryptedUser: User = user;
        return encryptedUser;
    }
}

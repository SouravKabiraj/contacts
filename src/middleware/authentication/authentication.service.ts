import {User} from "../../user/user.model";
import {sign, verify} from "jsonwebtoken";
import {RsaConfig} from "../../config/rsa.config";
import {injectable} from "inversify";

@injectable()
export class AuthenticationService {
    public getTokenFor(user: User): string {
        const privateKey = RsaConfig.getRSAPrivateKey();
        const rcaAlgorithm = RsaConfig.getRCAAlgorithm();
        const token = sign(user, privateKey, rcaAlgorithm);
        return token;
    }

    public validateToken(token: string): User {
        const publicKey = RsaConfig.getRSAPublicKey();
        const rcaAlgorithm = RsaConfig.getRCAAlgorithm();
        const payload: User = verify(token, publicKey, {algorithms: [rcaAlgorithm.algorithm]});
        return payload;
    }
}

import fs from "fs";
import * as config from '../../config/default.json';
import path = require('path');


export class RsaConfig {
    public static getRSAPublicKey(): string {
        return fs.readFileSync(path.resolve(process.cwd(), './rsa_keys/public.pem'), 'utf8');
    }

    public static getRSAPrivateKey(): string {
        return fs.readFileSync(path.resolve(process.cwd(), './rsa_keys/private.pem'), 'utf8');
    }

    public static getRCAAlgorithm(): { algorithm: string } {
        return config.rsa_algo;
    }
}

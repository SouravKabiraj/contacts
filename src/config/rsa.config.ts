import fs from "fs";

const config = require('config');
import path = require('path');


export class RsaConfig {
    public static getRSAPublicKey(): string {
        return fs.readFileSync(path.resolve(process.cwd(), './rsa_keys/public.pem'), 'utf8');
    }

    public static getRSAPrivateKey(): string {
        return fs.readFileSync(path.resolve(process.cwd(), './rsa_keys/private.pem'), 'utf8');
    }

    public static getRCAAlgorithm(): { algorithm: string } {
        return config.get('rsa_algo');
    }
}

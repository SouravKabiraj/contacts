import fs from "fs";
import './../../rsa_keys/public.key';
import * as config from './default.json';


export class RsaConfig {
    public static getRSAPublicKey(): string {
        return fs.readFileSync('./../../rsa_keys/public.key', 'utf8');
    }

    public static getRSAPrivateKey(): string {
        return fs.readFileSync('./../../rsa_keys/private.key', 'utf8');
    }

    public static getRCAAlgorithm(): { algorithm: string } {
        return config.rsa_algo;
    }
}

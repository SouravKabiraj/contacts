import * as config from './default.json';
import {connect, disconnect} from 'mongoose';

export async function connectTestDatabase() {
    await connect(config.dbURI, {useNewUrlParser: true, useUnifiedTopology: true});
}

export async function disconnectTestDatabase() {
    await disconnect();
}

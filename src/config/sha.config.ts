import {saltSecret} from './default.json';

const CryptrObject = require('cryptr');

export const cryptr = new CryptrObject(saltSecret);

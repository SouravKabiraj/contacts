import {saltSecret} from '../../config/default.json';

const CryptrObject = require('cryptr');

export const cryptr = new CryptrObject(saltSecret);

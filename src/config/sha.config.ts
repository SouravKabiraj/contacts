const config = require('config');

const CryptrObject = require('cryptr');

export const cryptr = new CryptrObject(config.get('saltSecret'));

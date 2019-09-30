const config = require('config');

export const whiteListedApis = config.get('whiteListedApis');
export const port = config.get('port');

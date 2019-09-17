import * as mongoose from 'mongoose';
import * as config from './default.json';

mongoose.connect(config.dbURI);

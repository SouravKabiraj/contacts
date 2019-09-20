import * as config from './default.json';
import {connect, set} from 'mongoose';

connect(config.dbURI, {useNewUrlParser: true, useUnifiedTopology: true});
set('useFindAndModify', false);

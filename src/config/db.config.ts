import * as config from '../../config/default.json';
import {connect, set} from 'mongoose';

connect(config.dbURI, {useNewUrlParser: true, useUnifiedTopology: true});
set('useFindAndModify', false);

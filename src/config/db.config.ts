const config = require('config');
import {connect, set} from 'mongoose';

connect(config.get('dbURI'), {useNewUrlParser: true, useUnifiedTopology: true});
set('useFindAndModify', false);

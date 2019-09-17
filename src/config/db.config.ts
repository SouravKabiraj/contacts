import * as config from './default.json';
import {connect} from 'mongoose';

connect(config.dbURI, {useNewUrlParser: true, useUnifiedTopology: true});

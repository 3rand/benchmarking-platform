import * as mongoose from 'mongoose';
import * as _ from 'underscore';

import Sequence from './sequence';


const Schema = mongoose.Schema;

const toolsSchema = new mongoose.Schema({
    name: String,
    version: String,
    description: String,
    gitRepo: String,
    pathCmd: String
});


const Tool = mongoose.model('Tool', toolsSchema);

export default Tool;

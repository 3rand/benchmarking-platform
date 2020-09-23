import * as mongoose from 'mongoose';
import GeneralConfigs from '../configurations/general';
const Schema = mongoose.Schema;

const jobSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    dataset: String,
    type: String,
    status: String,
});

const Job = mongoose.model('Job', jobSchema);

export default Job;

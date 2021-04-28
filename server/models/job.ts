import * as mongoose from 'mongoose';
import GeneralConfigs from '../configurations/general';
import SequenceConfigs from '../configurations/sequence';
const Schema = mongoose.Schema;

const jobSchema = new mongoose.Schema({
    target: {
        type: Schema.Types.ObjectId,
        ref: 'Dataset'
    },
    tool: {
        type: Schema.Types.ObjectId,
        ref: 'Tool'
    },
    germline: {
        type: Schema.Types.ObjectId,
        ref: 'Germline'
    },
    type: String,
    annotations: [{
        type: Schema.Types.ObjectId,
        ref: 'Job'
    }],
    status: {
        type: String,
        enum: SequenceConfigs.jobStatusSteps
    }
});

const Job = mongoose.model('Job', jobSchema);

export default Job;

import * as mongoose from 'mongoose';
import * as _ from 'underscore';

import Sequence from './sequence';


const Schema = mongoose.Schema;

const datasetsSchema = new mongoose.Schema({
    name: String,
    description: String,
    files: [
        {
            type: Schema.Types.ObjectId,
            ref: 'SequenceFiles'
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdDate: {type: Date, default: Date.now}
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

const geSequencesCount = async (datasetId) => {
    return await Sequence.count({
        datasetId: datasetId
    });
};


datasetsSchema.virtual('seqencesCount').get(() => {
    return geSequencesCount(this._id);
});

datasetsSchema.virtual('annotationsCount').get(() => {
    return Math.random() * 10;
});


const Dataset = mongoose.model('Dataset', datasetsSchema);

export default Dataset;

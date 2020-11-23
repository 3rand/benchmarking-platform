const mongoose = require('mongoose-fill');

const Schema = mongoose.Schema;
import SequenceConfigs from '../configurations/sequence';
import Sequence from './sequence';

const SequenceFilesSchema = new mongoose.Schema({
    fileName: String,
    path: String,
    type: {
        type: String,
        enum: SequenceConfigs.acceptedFileTypes
    },
    uploadDate: {type: Date, default: Date.now},
    datasets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Dataset'
        }
    ]

}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});
// Duplicate the ID field.
SequenceFilesSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

SequenceFilesSchema.fill('seqencesCount', (callback) => {
    console.log(this.id);
    Sequence.count({
        sourceFile: this.id
    }).exec(callback);
});

const SequenceFile = mongoose.model('SequenceFile', SequenceFilesSchema);

export default SequenceFile;

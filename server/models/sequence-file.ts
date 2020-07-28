import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
import SequenceConfigs from '../configurations/sequence';

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

});

const SequenceFile = mongoose.model('SequenceFile', SequenceFilesSchema);

export default SequenceFile;

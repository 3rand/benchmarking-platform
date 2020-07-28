import * as mongoose from 'mongoose';
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
    createdDate: { type: Date, default: Date.now }
});

const Dataset = mongoose.model('Dataset', datasetsSchema);

export default Dataset;

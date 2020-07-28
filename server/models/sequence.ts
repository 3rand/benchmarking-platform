import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;


const sequencesSchema = new mongoose.Schema({
    seqId: String,
    content: String,
    datasetId: {
        type: Schema.Types.ObjectId,
        ref: 'Dataset'
    },
    sourceFile: {
        type: Schema.Types.ObjectId,
        ref: 'SequenceFile'
    }
});

const Sequence = mongoose.model('Sequence', sequencesSchema);

export default Sequence;

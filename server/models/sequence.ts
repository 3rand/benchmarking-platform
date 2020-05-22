import * as mongoose from 'mongoose';

const sequencesSchema = new mongoose.Schema({
    seqId: String,
    content: String,
    datasetId: String // for now we keep it string, later to be a related model
});

const Sequence = mongoose.model('Sequence', sequencesSchema);

export default Sequence;

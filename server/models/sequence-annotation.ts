import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;


const sequencesAnnotationSchema = new mongoose.Schema({
    jobId: {
        type: Schema.Types.ObjectId,
        ref: 'Job'
    },
    seqId: String,
    locus: String,
    v_call: String,
    d_call: String,
    j_call: String,
    productive: String,
    cdr3aa: String
});

const SequenceAnnotation = mongoose.model('SequenceAnnotation', sequencesAnnotationSchema);

export default SequenceAnnotation;

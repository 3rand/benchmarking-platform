import * as mongoose from 'mongoose';
import GeneralConfigs from '../configurations/general';
const Schema = mongoose.Schema;

const germlineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    genes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'GermlineGenes'
        }
    ],
    organism: {
        type: String,
        enum: GeneralConfigs.availableOrganisms,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    privacy: {
        type: String,
        enum: GeneralConfigs.germlines.privacies,
        required: true
    },
    createdDate: { type: Date, default: Date.now }
});

const Germline = mongoose.model('Germline', germlineSchema);

export default Germline;

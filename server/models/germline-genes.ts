import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;


const germlineGenesSchema = new mongoose.Schema({
    name: String,
    type: String,
    chain: String,
    sequence: String
});

const GermlineGenes = mongoose.model('GermlineGenes', germlineGenesSchema);

export default GermlineGenes;

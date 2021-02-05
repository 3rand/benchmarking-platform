import Sequence from '../models/sequence';
import BaseCtrl from './base';

class SequenceCtrl extends BaseCtrl {
  model = Sequence;

    // Get all
    getAll = async (req, res) => {
        try {
            const docs = await this.model.find({}).populate('sourceFile').populate('datasetId');

            const docsToReturn = [];

            for (const doc of docs) {
                const docObject = doc._doc;
                console.log(docObject);
                docObject.sourceFile = docObject.sourceFile.fileName;
                docObject.datasetId = docObject.datasetId.name;
                docsToReturn.push(docObject);

            }

            res.status(200).json(docsToReturn);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

}

export default SequenceCtrl ;

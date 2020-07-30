import BaseCtrl from './base';
import * as jwt from 'jsonwebtoken';
import Germline from '../models/germline';
import GermlineGenes from '../models/germline-genes';
import * as _ from 'underscore';

const moment = require('moment');

class GermlineCtrl extends BaseCtrl {
    model = Germline;
    geneModel = GermlineGenes;


    // Get all
    getAll = async (req, res) => {
        try {

            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);

            if (!(!!decodedToken && !!decodedToken.user)) {
                throw new Error('Invalid credentials');
            }


            const docs = await this.model.find({
                $or: [
                    {
                        privacy: 'Public'
                    },
                    {
                        owner: decodedToken.user._id
                    }
                ]
            }).populate('genes');

            const docsToReturn = [];

            for (const doc of docs) {
                const docObject = doc._doc;

                const vGenes = _.where(docObject.genes, {type: 'V'});
                const dGenes = _.where(docObject.genes, {type: 'D'});
                const jGenes = _.where(docObject.genes, {type: 'J'});

                docObject.vgenes = vGenes.length;
                docObject.dgenes = dGenes.length;
                docObject.jgenes = jGenes.length;

                docObject.createdDate = moment(docObject.createdDate).format('D/M/YYYY HH:mm');

                docsToReturn.push(docObject);

            }

            res.status(200).json(docsToReturn);
        } catch (err) {
            return res.status(400).json({error: err.message});
        }
    };


    // Insert
    insert = async (req, res) => {
        try {

            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);

            if (!(!!decodedToken && !!decodedToken.user)) {
                throw new Error('Invalid credentials');
            }

            const objectToSave = req.body;
            objectToSave.owner = decodedToken.user._id;

            const fakeGene1 = {
                name: 'IGHV-1',
                type: 'V',
                sequence: 'ATTCG'
            };
            const fakeGene2 = {
                name: 'IGHD-2',
                type: 'D',
                sequence: 'AATTTATTCG'
            };
            const fakeGene3 = {
                name: 'IGHJ-3',
                type: 'J',
                sequence: 'AATTGGGGTATTCG'
            };

            const geneObj1 = await this.geneModel(fakeGene1).save();
            const geneObj2 = await this.geneModel(fakeGene2).save();
            const geneObj3 = await this.geneModel(fakeGene3).save();

            objectToSave.genes = [
                geneObj1._id,
                geneObj2._id,
                geneObj3._id
            ];

            console.log(objectToSave);

            const obj = await new this.model(objectToSave).save();
            res.status(201).json(obj);
        } catch (err) {
            return res.status(400).json({error: err.message});
        }
    };


    // Update by id
    update = async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);

            if (!(!!decodedToken && !!decodedToken.user)) {
                throw new Error('Invalid credentials');
            }

            const objectFromDb = await this.model.find({_id: req.params.id});

            if (objectFromDb[0]._doc.owner === decodedToken.user._id) {
                await this.model.findOneAndUpdate({ _id: req.params.id }, req.body);
                res.sendStatus(200);
            } else {
                res.status(400).json({ error: 'This germline does not belong to you.' });
            }

        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }


}

export default GermlineCtrl;

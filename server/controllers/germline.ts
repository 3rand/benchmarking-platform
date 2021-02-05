import BaseCtrl from './base';
import * as jwt from 'jsonwebtoken';
import Germline from '../models/germline';
import GermlineGenes from '../models/germline-genes';
import * as _ from 'underscore';
import * as path from 'path';
import Sequence from '../models/sequence';

const moment = require('moment');
const {v1: uuidv1} = require('uuid');
const fasta = require('bionode-fasta');

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

                const vGenes = _.where(docObject.genes, {type: 'vgenes'});
                const dGenes = _.where(docObject.genes, {type: 'dgenes'});
                const jGenes = _.where(docObject.genes, {type: 'jgenes'});

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
    }


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

            const obj = await new this.model(objectToSave).save();
            res.status(201).json(obj);
        } catch (err) {
            return res.status(400).json({error: err.message});
        }
    }

    // Insert
    insertFile = async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);

            if (!(!!decodedToken && !!decodedToken.user)) {
                throw new Error('Invalid credentials');
            }
            if (!!req.files.file) {
                console.log(req.body);
                const germline = await this.model.findOne({
                    owner: decodedToken.user._id,
                    _id: req.body.germline
                });

                console.log(germline);
                if (!germline.genes) {
                    germline.genes = [];
                }
                const file = req.files.file;
                req.body.fileName = file.name;
                const uniqueFilename = uuidv1() + '_' + file.name;
                file.mv(path.join(__dirname, '../uploads/') + uniqueFilename);
                req.body.path = uniqueFilename;

                console.log(path.join(__dirname, '../uploads/') + uniqueFilename);
                await fasta.obj(path.join(__dirname, '../uploads/') + uniqueFilename).on('data', async (s) => {
                    await new GermlineGenes({
                        name: s.id,
                        sequence: s.seq,
                        chain: req.body.chain,
                        type: req.body.geneType
                    }).save().then(async data => {
                        germline.genes.push(data._id);
                        await this.model.findOneAndUpdate({_id: germline._id}, germline);
                    });
                });

                res.status(201).json(germline.genes);
            } else {
                return res.status(400).json({error: 'No file uploaded.'});
            }
        } catch (err) {
            return res.status(400).json({error: err.message});
        }
    }

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
                await this.model.findOneAndUpdate({_id: req.params.id}, req.body);
                res.sendStatus(200);
            } else {
                res.status(400).json({error: 'This germline does not belong to you.'});
            }

        } catch (err) {
            return res.status(400).json({error: err.message});
        }
    }

    // Get details by id
    // Get by id
    get = async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);

            if (!(!!decodedToken && !!decodedToken.user)) {
                throw new Error('Invalid credentials');
            }


            const docs = await this.model.find({
                    $and: [
                        {_id: req.params.id},
                        {
                            $or: [
                                {
                                    privacy: 'Public'
                                },
                                {
                                    owner: decodedToken.user._id
                                }
                            ]
                        }
                    ]
                }
            ).populate('genes');

            const docsToReturn = [];

            for (const doc of docs) {
                const docObject = doc._doc;
                docObject.createdDate = moment(docObject.createdDate).format('D/M/YYYY HH:mm');
                docsToReturn.push(docObject);
            }

            res.status(200).json(docsToReturn[0]);
        } catch (err) {
            return res.status(500).json({error: err.message});
        }
    }
}

export default GermlineCtrl;

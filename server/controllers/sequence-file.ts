import BaseCtrl from './base';
import * as jwt from 'jsonwebtoken';
import SequenceFile from '../models/sequence-file';
import Dataset from '../models/dataset';
import * as _ from 'underscore';
import * as path from 'path';
import Sequence from '../models/sequence';

const {v1: uuidv1} = require('uuid');
const fasta = require('bionode-fasta');

class SequenceFileCtrl extends BaseCtrl {
    model = SequenceFile;
    modelDataset = Dataset;

    // Get all
    getAll = async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);

            if (!(!!decodedToken && !!decodedToken.user)) {
                throw new Error('Invalid credentials');
            }


            const datasets = await this.modelDataset.find({
                owner: decodedToken.user._id
            });

            const fileIds = [];
            for (const ds of datasets) {
                for (const file of ds.files) {
                    fileIds.push(file);
                }
            }

            const docs = await this.model.find({
                _id: {
                    $in: _.uniq(fileIds)
                }
            }).populate('datasets').fill('seqencesCount');

            const items = [];
            console.log(docs);
            for (const doc of docs) {
                const item = {
                    _id: doc._doc._id,
                    name: doc._doc.fileName,
                    type: doc._doc.type,
                    uploadDate: doc._doc.uploadDate,
                    datasets: _.pluck(doc._doc.datasets, 'name').join(', '),
                    seqencesCount: doc._doc.seqencesCount
                };
                items.push(item);
            }
            res.status(200).json(items);
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


            if (!!req.files.file) {

                const datasets = await this.modelDataset.find({
                    owner: decodedToken.user._id,
                    _id: {
                        $in: req.body.datasets
                    }
                });


                const file = req.files.file;
                req.body.fileName = file.name;
                const uniqueFilename = uuidv1() + '_' + file.name;
                file.mv(path.join(__dirname, '../uploads/') + uniqueFilename);
                req.body.path = uniqueFilename;

                const obj = await new this.model(req.body).save();
                const objFile = obj._doc;

                for (const ds of datasets) {
                    const dataset = ds._doc;
                    if (!dataset.files) {
                        dataset.files = [];
                    }
                    if (!dataset.files.includes(objFile._id)) {
                        dataset.files.push(objFile._id);
                    }

                    const updatedDataset = Object.assign({}, dataset);
                    delete updatedDataset._id;
                    console.log(updatedDataset);
                    await this.modelDataset.findOneAndUpdate({_id: dataset._id}, updatedDataset);
                }

                console.log(path.join(__dirname, '../uploads/') + uniqueFilename);
                fasta.obj(path.join(__dirname, '../uploads/') + uniqueFilename).on('data', (s) => {
                    new Sequence({
                        seqId: s.id,
                        content: s.seq,
                        datasetId: obj.datasets,
                        sourceFile: obj._id
                    }).save();
                });

                res.status(201).json(obj);
            } else {
                return res.status(400).json({error: 'No file uploaded.'});
            }
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
            const updatedObj = await this.model.findOneAndUpdate({_id: req.params.id}, req.body);
            console.log('updated: ', updatedObj);
            const datasets = await this.modelDataset.find({
                owner: decodedToken.user._id,
            });

            for (const ds of datasets) {
                const dataset = ds._doc;
                if (!dataset.files) {
                    dataset.files = [];
                }
                // add file to datasets, if datasets was assigned to file
                if (req.body.datasets.includes(dataset._id) && !dataset.files.includes(updatedObj._id)) {
                    dataset.files.push(updatedObj._id);
                    console.log('Add file ' + updatedObj._id + ' to dataset ' + dataset._id, dataset.files);
                }
                // remove file from datasets, if datasets was removed from file
                if (dataset.files.includes(updatedObj._id) && !req.body.datasets.includes(dataset._id)) {
                    dataset.files = _.without(dataset.files, updatedObj._id);
                    console.log('Remove file ' + updatedObj._id + ' from dataset ' + dataset._id, dataset.files);
                }

                const updatedDataset = Object.assign({}, dataset);
                delete updatedDataset._id;
                console.log(dataset);
                await this.modelDataset.findOneAndUpdate({_id: dataset._id}, updatedDataset);
            }

            res.sendStatus(200);
        } catch (err) {
            return res.status(400).json({error: err.message});
        }
    };

    // Delete by id
    delete = async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);

            if (!(!!decodedToken && !!decodedToken.user)) {
                throw new Error('Invalid credentials');
            }

            await this.model.findOneAndRemove({_id: req.params.id});

            const datasets = await this.modelDataset.find({
                owner: decodedToken.user._id,
            });

            for (const ds of datasets) {
                const dataset = ds._doc;
                if (!dataset.files) {
                    dataset.files = [];
                }

                // TODO
                // remove file from datasets, if datasets was removed from file
                if (dataset.files.includes(req.params.id)) {
                    dataset.files = dataset.files.filter((value, index, arr) => {
                        return value !== req.params.id;
                    });
                    console.log('Remove file ' + req.params.id + ' from dataset ' + dataset._id, dataset.files);
                }

                const updatedDataset = Object.assign({}, dataset);
                delete updatedDataset._id;
                console.log(dataset);
                await this.modelDataset.findOneAndUpdate({_id: dataset._id}, updatedDataset);
            }


            res.sendStatus(200);
        } catch (err) {
            return res.status(400).json({error: err.message});
        }
    };
}

export default SequenceFileCtrl;

import BaseCtrl from './base';
import * as jwt from 'jsonwebtoken';
import Job from '../models/job';
import SequenceAnnotation from '../models/sequence-annotation';
import * as _ from 'underscore';

const moment = require('moment');

class JobCtrl extends BaseCtrl {
    model = Job;
    sequenceAnnotation = SequenceAnnotation;
    // Get all
    getAll = async (req, res) => {
        try {

            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);

            if (!(!!decodedToken && !!decodedToken.user)) {
                throw new Error('Invalid credentials');
            }


            const docs = await this.model.find({}).populate('tool').populate('target').populate('germline');

            const docsToReturn = [];

            for (const doc of docs) {
                const docObject = doc._doc;

                docObject.tool = docObject.tool.name + ' ' + docObject.tool.version;
                docObject.target = docObject.target.name;
                docObject.germline = docObject.germline.name;
                docObject.createdDate = moment(docObject.createdDate).format('D/M/YYYY HH:mm');

                docsToReturn.push(docObject);

            }

            res.status(200).json(docsToReturn);
        } catch (err) {
            return res.status(400).json({error: err.message});
        }
    }
    // Get by id
    get = async (req, res) => {
        try {
            const obj = await this.model.findOne({ _id: req.params.id }).populate('target').populate('tool');
            const doc = obj._doc;
            const sequencesAnnoated = await this.sequenceAnnotation.find({jobId: doc._id});
            doc.sequencesAnnoated = sequencesAnnoated;
            res.status(200).json(doc);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    // Get all
    getAnnotations = async (req, res) => {
        try {

            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);

            if (!(!!decodedToken && !!decodedToken.user)) {
                throw new Error('Invalid credentials');
            }


            const docs = await this.model.find({type: 'annotation'}).populate('target').populate('tool').populate('germline');

            const docsToReturn = [];

            for (const doc of docs) {
                const docObject = doc._doc;

                docObject.createdDate = moment(docObject.createdDate).format('D/M/YYYY HH:mm');
                docObject.targetName = docObject.target.name;
                docObject.germlineName = docObject.germline.name;
                docObject.toolName = docObject.tool.name + ' ' + docObject.tool.version;
                docsToReturn.push(docObject);

            }

            res.status(200).json(docsToReturn);
        } catch (err) {
            return res.status(400).json({error: err.message});
        }
    }

// Get all
    getBenchmarks = async (req, res) => {
        try {

            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);

            if (!(!!decodedToken && !!decodedToken.user)) {
                throw new Error('Invalid credentials');
            }


            const docs = await this.model.find({type: 'benchmark'}).populate('annotations');

            const docsToReturn = [];

            for (const doc of docs) {
                const docObject = doc._doc;

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

            console.log(objectToSave);

            const obj = await new this.model(objectToSave).save();

            res.status(201).json(obj);
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
                await this.model.findOneAndUpdate({ _id: req.params.id }, req.body);
                res.sendStatus(200);
            } else {
                res.status(400).json({ error: 'This job does not belong to you.' });
            }

        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    delete = async (req, res) => {
        try {
            await this.model.findOneAndRemove({ _id: req.params.id });
            res.sendStatus(200);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

export default JobCtrl;

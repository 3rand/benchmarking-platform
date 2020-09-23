import BaseCtrl from './base';
import * as jwt from 'jsonwebtoken';
import Job from '../models/job';
import * as _ from 'underscore';

const moment = require('moment');

class JobCtrl extends BaseCtrl {
    model = Job;

    // Get all
    getAll = async (req, res) => {
        try {

            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);

            if (!(!!decodedToken && !!decodedToken.user)) {
                throw new Error('Invalid credentials');
            }


            const docs = await this.model.find({});

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

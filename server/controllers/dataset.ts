import BaseCtrl from './base';
import Dataset from '../models/dataset';
import * as jwt from 'jsonwebtoken';

class DatasetCtrl extends BaseCtrl {
    model = Dataset;

    // Get all
    getAll = async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);

            if (!(!!decodedToken && !!decodedToken.user)) {
                throw new Error('Invalid credentials');
            }
            const docs = await this.model.find({owner: decodedToken.user._id});
            res.status(200).json(docs);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    // Get condensed
    getCondensed = async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);

            if (!(!!decodedToken && !!decodedToken.user)) {
                throw new Error('Invalid credentials');
            }


            const docs = await this.model.find({
                owner: decodedToken.user._id
            });
            const items = [];
            for (const doc of docs) {
                const item = {
                    _id: doc._doc._id,
                    name: doc._doc.name,
                    description: doc._doc.description,
                    createdDate: doc._doc.createdDate,
                    files: doc._doc.files.length,
                    annotations: Math.round(Math.random() *  10) * Math.round(Math.random() * 5),
                    sequences: Math.round(Math.random() *  10) * Math.round(Math.random() * 1000)
                };
                items.push(item);
            }
            res.status(200).json(items);
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

            req.body.owner = decodedToken.user._id;
            const obj = await new this.model(req.body).save();
            res.status(201).json(obj);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

export default DatasetCtrl;

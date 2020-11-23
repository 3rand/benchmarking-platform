import * as express from 'express';

import SequenceCtrl from './controllers/sequence';
import UserCtrl from './controllers/user';
import DatasetCtrl from './controllers/dataset';
import SequenceFileCtrl from './controllers/sequence-file';
import GermlineCtrl from './controllers/germline';
import ToolCtrl from './controllers/tool';

function setRoutes(app) {
    const router = express.Router();
    const sequenceCtrl = new SequenceCtrl();
    const userCtrl = new UserCtrl();
    const datasetCtrl = new DatasetCtrl();
    const sequenceFileCtrl = new SequenceFileCtrl();
    const germlineCtrl = new GermlineCtrl();
    const toolCtrl = new ToolCtrl();

    // Sequences
    router.route('/sequences').get(sequenceCtrl.getAll);
    router.route('/sequences/count').get(sequenceCtrl.count);
    router.route('/sequence').post(sequenceCtrl.insert);
    router.route('/sequence/:id').get(sequenceCtrl.get);
    router.route('/sequence/:id').put(sequenceCtrl.update);
    router.route('/sequence/:id').delete(sequenceCtrl.delete);

    // Users
    router.route('/login').post(userCtrl.login);
    router.route('/users').get(userCtrl.getAll);
    router.route('/users/count').get(userCtrl.count);
    router.route('/user').post(userCtrl.insert);
    router.route('/user/:id').get(userCtrl.get);
    router.route('/user/:id').put(userCtrl.update);
    router.route('/user/:id').delete(userCtrl.delete);


    // Datsets
    router.route('/datasets').get(datasetCtrl.getAll);
    router.route('/datasetsCondensed').get(datasetCtrl.getCondensed);
    router.route('/dataset').post(datasetCtrl.insert);
    router.route('/dataset/:id').get(datasetCtrl.get);
    router.route('/dataset/:id').put(datasetCtrl.update);
    router.route('/dataset/:id').delete(datasetCtrl.delete);

    // Sequence files
    router.route('/sequenceFiles').get(sequenceFileCtrl.getAll);
    router.route('/sequenceFile').post(sequenceFileCtrl.insert);
    router.route('/sequenceFile/:id').get(sequenceFileCtrl.get);
    router.route('/sequenceFile/:id').put(sequenceFileCtrl.update);
    router.route('/sequenceFile/:id').delete(sequenceFileCtrl.delete);


    // Germlines
    router.route('/germlines').get(germlineCtrl.getAll);
    router.route('/germline').post(germlineCtrl.insert);
    router.route('/germline/:id').get(germlineCtrl.get);
    router.route('/germline/:id').put(germlineCtrl.update);
    router.route('/germline/:id').delete(germlineCtrl.delete);

    // Tools
    router.route('/tools').get(toolCtrl.getAll);


    // Apply the routes to our application with the prefix /api
    app.use('/api', router);

}

export default setRoutes;

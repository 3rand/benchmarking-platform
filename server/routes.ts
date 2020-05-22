import * as express from 'express';

import SequenceCtrl from './controllers/sequence';
import UserCtrl from './controllers/user';

function setRoutes(app) {
  const router = express.Router();
  const sequenceCtrl = new SequenceCtrl();
  const userCtrl = new UserCtrl();

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

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}

export default setRoutes;

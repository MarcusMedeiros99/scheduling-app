import express from 'express';

const controller = require('../controllers/events');
const router = express.Router();
const authenticate = require('../middlewares/auth');

router.get('/', authenticate({requiresAdmin: true}), controller.get);
router.get('/:id', authenticate({requiresAdmin: false}), controller.getById);
router.get('/user/:user_id', authenticate({requiresAdmin: false}), controller.getByUser);
router.post('/', authenticate({requiresAdmin:false}), controller.post);
router.put('/', authenticate({requiresAdmin:false}), controller.put);
router.delete('/:id',authenticate({requiresAdmin: false}), controller.del);


module.exports = router;
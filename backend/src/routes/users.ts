import express from 'express';

const controller = require('../controllers/users');
const router = express.Router();
const authenticate = require('../middlewares/auth');

router.get('/', authenticate({requiresAdmin: true}), controller.get);
router.get('/:id', authenticate({requiresAdmin:false}), controller.getById);
router.post('/',controller.post);
router.put('/', authenticate({requiresAdmin: false}), controller.put);
router.delete('/:id', authenticate({requiresAdmin: false}), controller.del);



module.exports = router;
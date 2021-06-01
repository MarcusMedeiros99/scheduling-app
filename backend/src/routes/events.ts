import express from 'express';

const controller = require('../controllers/events');
const router = express.Router();

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.post('/', controller.post);
router.put('/', controller.put);
router.delete('/:id', controller.del);


module.exports = router;
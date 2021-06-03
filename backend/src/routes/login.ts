import express from 'express';

const controller = require('../controllers/login');
const router = express.Router();
const authenticate = require('../middlewares/auth');

router.get('/', authenticate({requiresAdmin: false}), controller.get);
router.post('/', controller.post);

module.exports = router;
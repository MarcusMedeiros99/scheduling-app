import express from 'express';

const controller = require('../controllers/logout');
const router = express.Router();
const authenticate = require('../middlewares/auth');

router.get('/', controller.get);

module.exports = router;
import express from 'express';

const router = express.Router();
const controller = require('../controllers/index');

router.get('/', controller.get);

module.exports = router;
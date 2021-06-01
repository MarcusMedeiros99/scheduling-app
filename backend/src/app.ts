import express from 'express';
const app = express();
const router = express.Router();

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')

app.use(express.json({strict: false}));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const index = require('./routes/index');
const users = require('./routes/users');
const events = require('./routes/events');

app.use('/', index);
app.use('/users', users);
app.use('/events', events);

export default app;
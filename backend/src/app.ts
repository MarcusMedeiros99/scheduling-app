import express from 'express';
const app = express();
const router = express.Router();
const cookieParser = require('cookie-parser');

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')

app.use(express.json({strict: false}));
app.use(cookieParser());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const index = require('./routes/index');
const users = require('./routes/users');
const events = require('./routes/events');
const login = require('./routes/login');

app.use('/', index);
app.use('/users', users);
app.use('/events', events);
app.use('/login', login);


export default app;
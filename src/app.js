const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('./lodash')
require('dotenv').config();

const middlewares = require('./middlewares');
const routes = require('./router')

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Local Host'
  });
});

app.use('/api/v2', routes)

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;

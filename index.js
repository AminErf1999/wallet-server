const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const category = require('./routes/categories');
const resource = require('./routes/resources');
const transaction = require('./routes/transactions');
const express = require('express');
const app = express();

mongoose
  .connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/category', category);
app.use('/api/resource', resource);
app.use('/api/transaction', transaction);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

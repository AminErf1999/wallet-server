const Joi = require('joi');
const mongoose = require('mongoose');
const { categorySchema } = require('./category');
const { resourceSchema } = require('./resource');

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    // validate on of these: ['income', 'expense']
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: categorySchema,
    required: true,
  },
  resource: {
    type: resourceSchema,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  time: {
    type: String,
    default: 'now!',
  },
  description: {
    type: String,
  },
});

const Transaction = mongoose.model('Transactions', transactionSchema);

// function validateTransaction(transaction) {
//   const schema = {
//     title: Joi.string().min(5).max(50).required(),
//     genreId: Joi.objectId().required(),
//     numberInStock: Joi.number().min(0).required(),
//     dailyRentalRate: Joi.number().min(0).required(),
//   };

//   return Joi.validate(transaction, schema);
// }

exports.Transaction = Transaction;
// exports.validate = validateTransaction;

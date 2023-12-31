const Joi = require('joi');
const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  current_amount: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  card_number: {
    type: Number,
    required: true,
    length: 16,
  },
});

const Resource = mongoose.model('Resource', resourceSchema);

// function validateResource(resource) {
//   const schema = {
//     name: Joi.string().min(5).max(50).required(),
//     phone: Joi.string().min(5).max(50).required(),
//     isGold: Joi.boolean(),
//   };

//   return Joi.validate(resource, schema);
// }

exports.resourceSchema = resourceSchema;
exports.Resource = Resource;
// exports.validate = validateResource;

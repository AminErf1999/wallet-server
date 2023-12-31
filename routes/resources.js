const { Resource } = require('../models/resource');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const resources = await Resource.find().sort('name');
  res.send(resources);
});

router.post('/', async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let resource = new Resource({
    name: req.body.name,
    current_amount: req.body.current_amount,
    currency: req.body.currency,
    type: req.body.type,
    card_number: req.body.card_number,
  });
  resource = await resource.save();

  res.send(resource);
});

router.put('/:id', async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const resource = await Resource.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      current_amount: req.body.current_amount,
      currency: req.body.currency,
      type: req.body.type,
      card_number: req.body.card_number,
    },
    { new: true },
  );

  if (!resource) return res.status(404).send('The resource with the given ID was not found.');

  res.send(resource);
});

router.delete('/:id', async (req, res) => {
  const resource = await Resource.findByIdAndRemove(req.params.id);

  if (!resource) return res.status(404).send('The resource with the given ID was not found.');

  res.send(resource);
});

// router.get('/:id', async (req, res) => {
//   const resource = await Resource.findById(req.params.id);

//   if (!resource) return res.status(404).send('The resource with the given ID was not found.');

//   res.send(resource);
// });

module.exports = router;

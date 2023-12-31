const { Transaction } = require('../models/transaction');
const { Category } = require('../models/category');
const { Resource } = require('../models/resource');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const transactions = await Transaction.find().sort('name');
  res.send(transactions);
});

router.post('/', async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const resource = await Resource.findById(req.body.resourceId);
  if (!resource) return res.status(400).send('Invalid resource.');

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send('Invalid category.');

  const transaction = new Transaction({
    type: req.body.type,
    amount: req.body.amount,
    category: {
      _id: category._id,
      name: category.name,
    },
    resource: {
      _id: resource._id,
      name: resource.name,
    },
    date: req.body.date,
    time: req.body.time,
    description: req.body.description,
  });
  await transaction.save();

  res.send(transaction);
});

router.put('/:id', async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const resource = await Resource.findById(req.body.resourceId);
  if (!resource) return res.status(400).send('Invalid resource.');

  const genre = await Category.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    {
      type: req.body.type,
      amount: req.body.amount,
      category: {
        _id: category._id,
        name: category.name,
      },
      resource: {
        _id: resource._id,
        name: resource.name,
      },
      date: req.body.date,
      time: req.body.time,
      description: req.body.description,
    },
    { new: true },
  );

  if (!transaction) return res.status(404).send('The transaction with the given ID was not found.');

  res.send(transaction);
});

router.delete('/:id', async (req, res) => {
  const transaction = await Transaction.findByIdAndRemove(req.params.id);

  if (!transaction) return res.status(404).send('The transaction with the given ID was not found.');

  res.send(transaction);
});

router.get('/:id', async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) return res.status(404).send('The transaction with the given ID was not found.');

  res.send(transaction);
});

module.exports = router;

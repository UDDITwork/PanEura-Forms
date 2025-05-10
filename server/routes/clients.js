const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

// Create
router.post('/', async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// Read all
router.get('/', async (req, res) => {
  const list = await Client.find().sort({ createdAt: -1 });
  res.json(list);
});

// Read one
router.get('/:id', async (req, res) => {
  const client = await Client.findById(req.params.id);
  res.json(client);
});

// Update status
router.put('/:id/status', async (req, res) => {
  const { status } = req.body;
  const client = await Client.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(client);
});

module.exports = router;

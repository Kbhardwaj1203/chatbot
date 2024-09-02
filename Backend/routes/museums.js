const express = require('express');
const Museum = require('../models/Museum');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const museums = await Museum.getAll();
    res.json(museums);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching museums' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const museum = await Museum.getById(req.params.id);
    if (museum) {
      res.json(museum);
    } else {
      res.status(404).json({ error: 'Museum not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the museum' });
  }
});

router.get('/search/:query', async (req, res) => {
  try {
    const museums = await Museum.search(req.params.query);
    res.json(museums);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching for museums' });
  }
});

module.exports = router;
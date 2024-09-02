// const express = require('express');
// const Ticket = require('../models/Ticket');

// const router = express.Router();

// router.post('/', async (req, res) => {
//   try {
//     const { museumId, visitorName, visitDate, quantity } = req.body;
//     const ticketId = await Ticket.create(museumId, visitorName, visitDate, quantity);
//     const ticket = await Ticket.getById(ticketId);
//     res.status(201).json(ticket);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while creating the ticket' });
//   }
// });

// router.get('/:id', async (req, res) => {
//   try {
//     const ticket = await Ticket.getById(req.params.id);
//     if (ticket) {
//       res.json(ticket);
//     } else {
//       res.status(404).json({ error: 'Ticket not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while fetching the ticket' });
//   }
// });

// module.exports = router;

const express = require('express');
const Ticket = require('../models/Ticket'); // Ensure this path is correct

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { museumId, visitorName, email, date, quantity } = req.body;

    if (!museumId || !visitorName || !email || !date || !quantity) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Assuming Ticket.create() returns the created ticket ID
    const ticketId = await Ticket.create({ museumId, visitorName, email, date, quantity });
    const ticket = await Ticket.getById(ticketId);
    res.status(201).json(ticket);
  } catch (error) {
    console.error('Error creating ticket:', error); // Log error for debugging
    res.status(500).json({ error: 'An error occurred while creating the ticket' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.getById(req.params.id);
    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({ error: 'Ticket not found' });
    }
  } catch (error) {
    console.error('Error fetching ticket:', error); // Log error for debugging
    res.status(500).json({ error: 'An error occurred while fetching the ticket' });
  }
});

module.exports = router;

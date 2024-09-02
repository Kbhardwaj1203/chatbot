// server.js - Main Server File

// const express = require('express');
// const cors = require('cors');
// const museumRoutes = require('./routes/museums');
// const ticketRoutes = require('./routes/tickets');
// const nlp = require('./utils/nlp');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// app.use('/api/museums', museumRoutes);
// app.use('/api/tickets', ticketRoutes);

// app.post('/api/chat', async (req, res) => {
//   try {
//     const { message } = req.body;
//     const response = await nlp.processMessage(message);
//     res.json({ response });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while processing the message' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const museumRoutes = require('./routes/museums');
const ticketRoutes = require('./routes/tickets');
const nlp = require('./utils/nlp');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/museums', museumRoutes);
app.use('/api/tickets', ticketRoutes);

app.post('/api/chat', async (req, res) => {
  try {
    const { message, museums } = req.body;
    const response = await nlp.processMessage(message, museums);
    res.json({ 
      response,
      showBookingForm: response.includes("I can help you book tickets")
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing the message' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
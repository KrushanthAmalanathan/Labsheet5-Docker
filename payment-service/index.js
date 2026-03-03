// app.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let payments = [];
let idCounter = 1;

// GET /payments - list all payments
app.get('/payments', (req, res) => {
  res.json(payments);
});

// GET /payments/:id - get a specific payment by ID
app.get('/payments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const payment = payments.find(p => p.id === id);

  if (payment) {
    res.json(payment);
  } else {
    res.status(404).json({ message: 'Payment not found' });
  }
});

// POST /payments/process - create a new payment
app.post('/payments/process', (req, res) => {
  const payment = req.body;

  payment.id = idCounter++;
  payment.status = 'SUCCESS';

  payments.push(payment);
  res.status(201).json(payment);
});

// Start the server
const PORT = 8083;
app.listen(PORT, () => {
  console.log(`Payment service running on port ${PORT}`);
});
// server.js
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017';
const dbName = 'ticket_reservation_system';

// Function to connect to MongoDB
const connectToMongoDB = async () => {
  const client = new MongoClient(mongoURL, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    throw error;
  }
};

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/reserveTicket', async (req, res) => {
  const { name, seatNumber } = req.body;

  try {
    const db = await connectToMongoDB();
    const ticketsCollection = db.collection('tickets');

    // Insert reservation into the database
    await ticketsCollection.insertOne({ name, seatNumber });

    res.send('Ticket reserved successfully!');
  } catch (error) {
    console.error('Error reserving ticket', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

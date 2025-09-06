const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000; // already using 5000

app.use(express.json());

// MongoDB connection
const mongoURI = "mongodb+srv://hprabodika657_db_user:64zCPMGuNJEb0Y7P@cluster0.r3sjfra.mongodb.net/CraftifyDB?retryWrites=true&w=majority";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
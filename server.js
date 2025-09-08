const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
const mongoURI =  "mongodb+srv://hprabodika657_db_user:64zCPMGuNJEb0Y7P@cluster0.r3sjfra.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

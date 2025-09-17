const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: "Reviews API works!" });
});

router.post('/', (req, res) => {
  const review = req.body;
  
  res.json({ message: "Review received!", review });
});

module.exports = router;

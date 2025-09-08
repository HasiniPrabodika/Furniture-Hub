const express = require('express');
const router = express.Router();
const multer = require('multer');
const Review = require("../reviewModel");


// Multer setup
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// POST /api/reviews
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log("📩 Body:", req.body);
    console.log("📷 File:", req.file);

    const { name, productName, category, rating, reviewText } = req.body;

    if (!name || !productName || !reviewText || !rating) {
      return res.json({ success: false, message: 'All required fields are missing!' });
    }

    const newReview = new Review({
      name,
      productName,
      category,
      rating: Number(rating),
      reviewText,
      imagePath: req.file ? req.file.path : undefined,
      imageType: req.file ? req.file.mimetype : undefined
    });

    await newReview.save();
    res.json({ success: true, message: 'Review saved with image!' });

  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
});

module.exports = router;


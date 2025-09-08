// models/reviewModel.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: String,
  productName: String,
  category: String,
  rating: Number,
  reviewText: String,
  imagePath: String,
  imageType: String
});

module.exports = mongoose.model('Reviews', reviewSchema);

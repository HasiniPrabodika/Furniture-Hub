const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  productName: { type: String, required: true },
  category: String,
  rating: { type: Number, required: true },
  review: { type: String, required: true },
  photo: String,
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Review", reviewSchema);
window.location.href = 'Review.html';
window.location.href = 'HomePage.html';
window.location.href = 'ProductPage.html';
window.location.href = 'ContactPage.html';
window.location.href = 'About.html';

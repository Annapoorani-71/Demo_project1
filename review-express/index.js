const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/reviewsDB', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Review Schema
const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rate: { type: Number, required: true },
  review: { type: String, required: true },
  isbn: { type: String, required: true }
});

// Review Model
const Review = mongoose.model('Review', reviewSchema);

// Routes

// Get all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get reviews by ISBN
app.get('/api/reviews/:isbn', async (req, res) => {
  try {
    const reviews = await Review.find({ isbn: req.params.isbn });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new review
app.post('/api/reviews', async (req, res) => {
  const { name, rate, review, isbn } = req.body;

  // Validate request data
  if (!name || !rate || !review || !isbn) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const newReview = new Review({
    name,
    rate,
    review,
    isbn
  });

  try {
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a review
app.put('/api/reviews/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found." });

    Object.assign(review, req.body);
    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a review
app.delete('/api/reviews/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found." });

    await review.remove();
    res.json({ message: "Review deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

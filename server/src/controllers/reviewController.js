const Review = require('../models/Review');
const { getIsConnected } = require('../config/db');
const { reviews: fallbackReviews } = require('../data/seedData');

let localReviews = [...fallbackReviews];

// @desc    Get all client reviews
// @route   GET /api/reviews
// @access  Public
exports.getReviews = async (req, res) => {
  try {
    if (getIsConnected()) {
      const reviews = await Review.find().sort({ createdAt: -1 });
      if (reviews && reviews.length > 0) {
        return res.status(200).json({ success: true, count: reviews.length, data: reviews });
      }
    }

    return res.status(200).json({
      success: true,
      count: localReviews.length,
      data: localReviews,
      source: 'fallback'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error retrieving reviews',
      error: error.message,
      data: fallbackReviews
    });
  }
};

// @desc    Create a client review
// @route   POST /api/reviews
// @access  Public
exports.createReview = async (req, res) => {
  try {
    const { clientName, company, role, avatar, review, rating, projectName } = req.body;

    if (!clientName || !company || !review) {
      return res.status(400).json({ success: false, message: 'Client name, company, and review content are required.' });
    }

    const reviewData = {
      clientName,
      company,
      role: role || 'Client',
      avatar: avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(clientName)}`,
      review,
      rating: Number(rating) || 5,
      projectName: projectName || 'Web Project',
      isDemo: false
    };

    if (getIsConnected()) {
      const newReview = await Review.create(reviewData);
      return res.status(201).json({ success: true, message: 'Review submitted successfully', data: newReview });
    }

    const mockReview = {
      _id: `rev-${Date.now()}`,
      ...reviewData,
      createdAt: new Date().toISOString()
    };
    localReviews.unshift(mockReview);

    return res.status(201).json({
      success: true,
      message: 'Review recorded successfully (In-Memory)',
      data: mockReview
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error submitting review', error: error.message });
  }
};

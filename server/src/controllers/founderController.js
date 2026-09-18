const Founder = require('../models/Founder');
const { getIsConnected } = require('../config/db');
const { founders: fallbackFounders } = require('../data/seedData');

// @desc    Get all founders
// @route   GET /api/founders
// @access  Public
exports.getFounders = async (req, res) => {
  try {
    if (getIsConnected()) {
      const founders = await Founder.find().sort({ featuredOrder: 1 });
      if (founders && founders.length > 0) {
        return res.status(200).json({ success: true, count: founders.length, data: founders });
      }
    }
    // Fallback response
    return res.status(200).json({
      success: true,
      count: fallbackFounders.length,
      data: fallbackFounders,
      source: 'fallback'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error retrieving founders',
      error: error.message,
      data: fallbackFounders
    });
  }
};

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  detailedDescription: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    required: true
  },
  technologies: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    required: true,
    enum: ['Websites', 'UI/UX', 'Creative', 'Custom Solutions', 'Other'],
    default: 'Websites'
  },
  liveUrl: {
    type: String,
    default: '#'
  },
  githubUrl: {
    type: String,
    default: '#'
  },
  featured: {
    type: Boolean,
    default: false
  },
  completionDate: {
    type: String,
    default: '2024'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);

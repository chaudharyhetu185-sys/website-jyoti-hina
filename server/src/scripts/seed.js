require('dotenv').config();
const mongoose = require('mongoose');
const Founder = require('../models/Founder');
const Project = require('../models/Project');
const Review = require('../models/Review');
const { founders, projects, reviews } = require('../data/seedData');

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/two_friends_studio';
    console.log(`Connecting to MongoDB at: ${mongoUri}`);
    await mongoose.connect(mongoUri);

    console.log('Clearing existing collections...');
    await Founder.deleteMany({});
    await Project.deleteMany({});
    await Review.deleteMany({});

    console.log('Seeding Founders data...');
    // Strip string ids for Mongo object generation
    const founderDocs = founders.map(({ _id, ...rest }) => rest);
    await Founder.insertMany(founderDocs);

    console.log('Seeding Projects data...');
    const projectDocs = projects.map(({ _id, ...rest }) => rest);
    await Project.insertMany(projectDocs);

    console.log('Seeding Reviews data...');
    const reviewDocs = reviews.map(({ _id, ...rest }) => rest);
    await Review.insertMany(reviewDocs);

    console.log('✅ Database seeded successfully with demo content!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();

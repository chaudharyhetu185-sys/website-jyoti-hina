// Vercel Serverless Function entry point
require('dotenv').config({ path: require('path').resolve(__dirname, '../server/.env') });
require('dotenv').config(); // Also load standard env

const app = require('../server/src/app');

module.exports = app;

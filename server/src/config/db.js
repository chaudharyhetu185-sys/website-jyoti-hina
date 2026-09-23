const mongoose = require('mongoose');
const dns = require('dns');

const path = require('path');
if (!process.env.MONGODB_URI) {
  require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
  require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });
  require('dotenv').config();
}

// Force IPv4 first to avoid SRV query issues on Node 18+ / Windows / Serverless
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

let cachedPromise = null;

const connectDB = async () => {
  // If already connected (readyState 1 = connected)
  if (mongoose.connection.readyState === 1) {
    return true;
  }

  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/two_friends_studio';

  if (!cachedPromise) {
    cachedPromise = mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    }).then((conn) => {
      console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
      return true;
    }).catch((error) => {
      cachedPromise = null;
      console.warn(`[MongoDB] Connection notice: MongoDB not reachable (${error.message}). Server will use dynamic in-memory fallback data.`);
      return false;
    });
  }

  return cachedPromise;
};

const getIsConnected = () => mongoose.connection.readyState === 1;

module.exports = {
  connectDB,
  getIsConnected
};

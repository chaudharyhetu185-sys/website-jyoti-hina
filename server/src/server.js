require('dotenv').config();
const dns = require('dns');
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}
const app = require('./app');
const { connectDB } = require('./config/db');
const { verifySMTPTransporter } = require('./controllers/contactController');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Attempt DB Connection (Non-blocking fallback enabled)
  await connectDB();

  // Verify SMTP Email Setup
  await verifySMTPTransporter();

  app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`🚀 REST API Server running on http://localhost:${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`==================================================`);
  });
};

startServer();

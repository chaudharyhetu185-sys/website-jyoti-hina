const express = require('express');
const router = express.Router();
const { submitContact, getContactMessages } = require('../controllers/contactController');

router.route('/')
  .post(submitContact)
  .get(getContactMessages);

module.exports = router;

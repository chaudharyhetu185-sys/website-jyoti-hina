const express = require('express');
const router = express.Router();
const { getFounders } = require('../controllers/founderController');

router.get('/', getFounders);

module.exports = router;

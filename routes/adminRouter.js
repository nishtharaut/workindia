const express = require('express');
const { authenticateUser, isAdmin } = require('../middlewares/authMiddleware');
const { addTrain } = require('../controllers/trainController');

const router = express.Router();

router.post('/trains', authenticateUser, isAdmin, addTrain);

module.exports = router;
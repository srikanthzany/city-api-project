// routes/cityRoutes.js
const cityRoutes = require('./routes/cityRoutes');
const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

router.post('/cities', cityController.addCity);
router.put('/cities/:id', cityController.updateCity);
router.delete('/cities/:id', cityController.deleteCity);
router.get('/cities', cityController.getCities);

module.exports = router;

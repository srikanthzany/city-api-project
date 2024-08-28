// controllers/cityController.js
const City = require('../models/City');

// Add a new city
exports.addCity = async (req, res) => {
  try {
    const city = new City(req.body);
    await city.save();
    res.status(201).json({ message: 'City added successfully', city });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing city
exports.updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await City.findByIdAndUpdate(id, req.body, { new: true });
    if (!city) return res.status(404).json({ message: 'City not found' });
    res.status(200).json({ message: 'City updated successfully', city });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a city
exports.deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await City.findByIdAndDelete(id);
    if (!city) return res.status(404).json({ message: 'City not found' });
    res.status(200).json({ message: 'City deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get cities with optional query parameters
exports.getCities = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'name', filter = '{}' } = req.query;
    const filters = JSON.parse(filter);
    const cities = await City.find(filters)
                             .sort(sort)
                             .skip((page - 1) * limit)
                             .limit(Number(limit));
    res.status(200).json(cities);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

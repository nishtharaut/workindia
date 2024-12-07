const pool = require('../config/db');

exports.addTrain = async (req, res) => {
  const { train_number, train_name, source, destination, total_seats } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO trains (train_number, train_name, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?, ?)',
      [train_number, train_name, source, destination, total_seats, total_seats]
    );
    
    res.status(201).json({ 
      message: 'Train added successfully', 
      trainId: result.insertId 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTrainAvailability = async (req, res) => {
  const { source, destination } = req.query;
  
  try {
    const [trains] = await pool.query(
      'SELECT train_number, train_name, source, destination, available_seats FROM trains WHERE source = ? AND destination = ?',
      [source, destination]
    );
    
    res.json(trains);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const pool = require('../config/db');

exports.bookSeat = async (req, res) => {
  const { train_id } = req.body;
  const user_id = req.user.id;
  
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const [trains] = await connection.query(
      'SELECT available_seats FROM trains WHERE id = ? FOR UPDATE', 
      [train_id]
    );
    
    if (trains.length === 0 || trains[0].available_seats <= 0) {
      await connection.rollback();
      return res.status(400).json({ error: 'No seats available' });
    }
    
    await connection.query(
      'UPDATE trains SET available_seats = available_seats - 1 WHERE id = ?', 
      [train_id]
    );
    
    const [bookingResult] = await connection.query(
      'INSERT INTO bookings (user_id, train_id) VALUES (?, ?)', 
      [user_id, train_id]
    );
    
    await connection.commit();
    
    res.status(201).json({ 
      message: 'Seat booked successfully', 
      bookingId: bookingResult.insertId 
    });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};

exports.getBookingDetails = async (req, res) => {
  const user_id = req.user.id;
  
  try {
    const [bookings] = await pool.query(
      `SELECT b.id, t.train_number, t.train_name, t.source, t.destination 
       FROM bookings b 
       JOIN trains t ON b.train_id = t.id 
       WHERE b.user_id = ?`, 
      [user_id]
    );
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

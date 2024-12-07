const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const JWT_SECRET = 'your_jwt_secret';

const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [decoded.userId]);
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    req.user = users[0];
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Admin rights required.' });
  }
};

module.exports = { authenticateUser, isAdmin, JWT_SECRET };
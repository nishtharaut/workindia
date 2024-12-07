import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: "localhost\SQLEXPRESS",
  user: "LP000007033049\Administrator",
  database: "workindia",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
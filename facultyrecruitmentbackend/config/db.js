import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nec',
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
  keepAliveInitialDelay: 10000, 
  enableKeepAlive: true, 
  multipleStatements: true,
});

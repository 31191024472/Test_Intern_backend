import { pool } from '../config/db.js';

export const getAllCategories = async () => {
  const [rows] = await pool.query('SELECT * FROM Categories');
  return rows;
};

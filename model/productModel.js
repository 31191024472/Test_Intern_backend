import { pool } from '../config/db.js';

export const getProductsByCategory = async (categoryId) => {
  const [rows] = await pool.query(
    `SELECT 
        p.product_id, p.name AS product_name, p.description,
        pv.variant_id, pv.color, pv.size, pv.price
     FROM Products p
     JOIN ProductVariants pv ON p.product_id = pv.product_id
     WHERE p.category_id = ?`,
    [categoryId]
  );
  return rows;
};
export const searchProducts = async (filters) => {
  const { q, color, size, min_price, max_price } = filters;

  let sql = `
    SELECT 
      p.product_id, p.name AS product_name, p.description,
      pv.variant_id, pv.color, pv.size, pv.price
    FROM Products p
    JOIN ProductVariants pv ON p.product_id = pv.product_id
    WHERE p.name LIKE ?
  `;
  const params = [`%${q}%`];

  if (color) {
    sql += ' AND pv.color = ?';
    params.push(color);
  }
  if (size) {
    sql += ' AND pv.size = ?';
    params.push(size);
  }
  if (min_price) {
    sql += ' AND pv.price >= ?';
    params.push(min_price);
  }
  if (max_price) {
    sql += ' AND pv.price <= ?';
    params.push(max_price);
  }

  const [rows] = await pool.query(sql, params);
  return rows;
};
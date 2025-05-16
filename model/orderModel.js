import { pool } from '../config/db.js';


export const createOrder = async (conn, user_id, address_id, total_price) => {
  const [result] = await conn.query(
    'INSERT INTO Orders (user_id, address_id, total_price) VALUES (?, ?, ?)',
    [user_id, address_id, total_price]
  );
  return result.insertId;
};

export const insertOrderItem = async (conn, order_id, variant_id, quantity, unit_price) => {
  await conn.query(
    'INSERT INTO OrderItems (order_id, variant_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
    [order_id, variant_id, quantity, unit_price]
  );
};

export const getVariantById = async (conn, variant_id) => {
  const [[row]] = await conn.query(
    'SELECT * FROM ProductVariants WHERE variant_id = ?',
    [variant_id]
  );
  return row;
};

export const getBranchByVariantId = async (conn, variant_id) => {
  const [[row]] = await conn.query(
    `SELECT branch_id, quantity
     FROM BranchProductVariants
     WHERE variant_id = ?
     LIMIT 1`,
    [variant_id]
  );
  return row;
};

export const decreaseInventory = async (conn, variant_id, branch_id, quantity) => {
  await conn.query(
    `UPDATE BranchProductVariants
     SET quantity = quantity - ?
     WHERE variant_id = ? AND branch_id = ?`,
    [quantity, variant_id, branch_id]
  );
};

export const updateOrderTotal = async (conn, order_id, total_price) => {
  await conn.query(
    'UPDATE Orders SET total_price = ? WHERE order_id = ?',
    [total_price, order_id]
  );
};

export const insertPayment = async (conn, order_id, payment) => {
  const { method, status, fee = 0 } = payment;
  await conn.query(
    'INSERT INTO Payments (order_id, method, status, fee) VALUES (?, ?, ?, ?)',
    [order_id, method, status, fee]
  );
};

export const getOrderWithUser = async (orderId) => {
  const [rows] = await pool.query(`
    SELECT o.order_id, o.total_price, u.name, u.email
    FROM Orders o
    JOIN Users u ON o.user_id = u.user_id
    WHERE o.order_id = ?
    LIMIT 1
  `, [orderId]);

  return rows[0];
};

import express from 'express';
import dotenv from 'dotenv';
import { pool } from './config/db.js';
import categoriesRouter from './routes/categories.js';
import productsRouter from './routes/products.js';
import ordersRouter from './routes/orders.js';
dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/categories', categoriesRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

(async () => {
  try {
    const [rows] = await pool.query('SELECT 1');
    console.log('MySQL đã sẵn sàng!');
  } catch (err) {
    console.error('Lỗi kết nối MySQL:', err.message);
    process.exit(1);
  }

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
  });
})();

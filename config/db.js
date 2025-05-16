import mysql from 'mysql2/promise';

let pool;

try {
  pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'ecommerce',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  // Kiểm tra kết nối ngay khi khởi tạo
  const connection = await pool.getConnection();
  console.log('Kết nối MySQL thành công!');
  connection.release(); 

} catch (error) {
  console.error('Không thể kết nối tới MySQL:', error.message);
  process.exit(1); 
}

export { pool };

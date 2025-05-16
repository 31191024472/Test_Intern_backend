#  E-commerce Backend – Technical Assessment

Đây là bài làm cho bài test vị trí **Backend Developer**. Hệ thống mô phỏng chức năng đặt hàng trên nền tảng thương mại điện tử, được triển khai với kiến trúc Layered rõ ràng, dễ mở rộng.

---

##  Tính năng đã hoàn thành

- Thiết kế cơ sở dữ liệu quan hệ chuẩn hóa (MySQL)
- API lấy danh mục, sản phẩm theo danh mục
- Tìm kiếm sản phẩm full-text kết hợp bộ lọc (giá, màu, size)
- Tạo đơn hàng, kiểm tra tồn kho, ghi thanh toán
- Trừ kho theo chi nhánh khi đơn hàng được ghi nhận
- Gửi email xác nhận đơn hàng (Gmail SMTP)
- Tính giá trị đơn hàng trung bình theo tháng
- Tính churn rate (tỷ lệ khách rời bỏ)
- Kiến trúc tách lớp: Controller → Service → Model

---

##  Công nghệ sử dụng

| Thành phần | Công nghệ |
|------------|-----------|
| Backend    | Node.js, Express |
| DB         | MySQL 8 |
| Email      | Nodemailer + Gmail SMTP |
| Driver DB  | mysql2 (promise) |
| Pattern    | Layered architecture |
| Env Config | dotenv |
| Test API   | Postman |

---

## ⚙️ Hướng dẫn cài đặt

### 1. Clone dự án
```bash
git clone https://github.com/your-repo/ecommerce-backend-test.git
cd ecommerce-backend-test
# 📂 E-commerce Backend – Technical Assessment

🚀 Bài test Backend Developer - Hệ thống đặt hàng trên nền tảng thương mại điện tử, được triển khai theo kiến trúc tách lớp chuyên nghiệp Controller → Service → Model.

---

## ✅ Tính năng đã hoàn thành

* Thiết kế CSDL quan hệ (MySQL) chuẩn hóa
* Lấy danh mục, sản phẩm theo danh mục
* Tìm kiếm toàn văn + filter theo màu, size, giá
* Tạo đơn hàng, xử lý thanh toán, trừ tồn kho
* Kiểm tra tồn kho trước khi đặt hàng
* Gửi email xác nhận đơn hàng (async)
* Tính trung bình giá trị đơn theo tháng
* Tính churn rate (khách hàng rời bỏ)

---

## 📊 Công nghệ sử dụng

| Thành phần   | Công nghệ               |
| ------------ | ----------------------- |
| Backend      | Node.js, Express        |
| DB           | MySQL 8                 |
| Email        | Nodemailer + Gmail SMTP |
| ORM / Driver | mysql2 (promise)        |
| Pattern      | Layered architecture    |
| Env Config   | dotenv                  |
| Test API     | Postman                 |

---

## ⚙️ Hướng dẫn cài đặt

### 1. Clone dự án

```bash
git clone https://github.com/your-repo/ecommerce-backend-test.git
cd ecommerce-backend-test
```

### 2. Cài đặt thư viện

```bash
npm install
```

### 3. Tạo file `.env`

```env
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM="Ecommerce Store" <your_gmail@gmail.com>
PORT=3000
```

### 4. Tạo database

* Tạo CSDL `ecommerce`
* Import `schema.sql` để tạo bảng

### 5. Khởi chạy server

```bash
npm run dev
```

> Server chạy tại: [http://localhost:3000](http://localhost:3000)

---

## 🔍 Hướng dẫn test API (Postman)

### Tạo đơn hàng:

```
POST /api/orders
```

```json
{
  "user_id": 1,
  "address_id": 1,
  "items": [
    { "variant_id": 1, "quantity": 2 }
  ],
  "payment": {
    "method": "momo",
    "status": "paid",
    "fee": 10000
  }
}
```

### Gửi email xác nhận:

```
POST /api/orders/1/send-confirmation
```

---

## 🧠 Gợi ý mở rộng (optional)

* JWT Authentication
* Phân quyền admin/user
* Trang admin dashboard để xem đơn hàng, doanh thu
* Tích hợp payment gateway thật (VNPAY, Stripe...)

---

## ✍️ Tác giả

* Họ tên: Bế Văn Thành
* Email: thanhgay171@gmail.com
* Ngày thực hiện: [16/5/2025 - 17/5/2025]


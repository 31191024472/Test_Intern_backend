import * as orderService from '../service/orderService.js';

export const createOrder = async (req, res) => {
  try {
    const orderId = await orderService.createOrder(req.body);
    res.status(201).json({ message: 'Đơn hàng đã được tạo', order_id: orderId });
  } catch (err) {
    console.error('Lỗi tạo đơn hàng:', err);
    res.status(500).json({ error: 'Không thể tạo đơn hàng' });
  }
};

export const sendOrderConfirmation = async (req, res) => {
  const orderId = req.params.id;
  try {
    // Gửi email async, không chờ
    orderService.sendConfirmationEmail(orderId);
    res.json({ message: `Yêu cầu gửi email xác nhận đơn hàng #${orderId} đã được xử lý bất đồng bộ.` });
  } catch (err) {
    console.error('❌ Lỗi gửi email xác nhận:', err);
    res.status(500).json({ error: 'Không thể gửi email xác nhận' });
  }
};
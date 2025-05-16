import { sendEmail } from '../utils/emailService.js';
import * as orderModel from '../model/orderModel.js';
import { pool } from '../config/db.js';

export const createOrder = async (orderData) => {
  const conn = await pool.getConnection();
  try {
    const { user_id, address_id, items, payment } = orderData;

    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('Danh sách sản phẩm không hợp lệ');
    }

    await conn.beginTransaction();

    const orderId = await orderModel.createOrder(conn, user_id, address_id, 0);

    let total = 0;

    for (const item of items) {
      const { variant_id, quantity } = item;
      if (!variant_id || !quantity || quantity <= 0) {
        throw new Error(`Sản phẩm không hợp lệ: ${JSON.stringify(item)}`);
      }

      const branch = await orderModel.getBranchByVariantId(conn, variant_id);
      if (!branch) {
        throw new Error(`Không tìm thấy tồn kho cho sản phẩm variant_id = ${variant_id}`);
      }

      if (branch.quantity < quantity) {
        throw new Error(`Sản phẩm '${variant_id}' tại chi nhánh '${branch.branch_id}' chỉ còn ${branch.quantity} sản phẩm`);
      }

      const variant = await orderModel.getVariantById(conn, variant_id);
      const unit_price = variant.price;

      await orderModel.insertOrderItem(conn, orderId, variant_id, quantity, unit_price);
      total += unit_price * quantity;

      await orderModel.decreaseInventory(conn, variant_id, branch.branch_id, quantity);
    }

    await orderModel.updateOrderTotal(conn, orderId, total);

    if (payment) {
      await orderModel.insertPayment(conn, orderId, payment);
    }

    await conn.commit();
    return orderId;

  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

export const sendConfirmationEmail = async (orderId) => {
  try {
    const orderInfo = await orderModel.getOrderWithUser(orderId);
    if (!orderInfo) {
      console.warn(`Không tìm thấy đơn hàng với id = ${orderId}`);
      return;
    }

    // Gửi email async
    await sendEmail({
      to: orderInfo.email,
      subject: `Xác nhận đơn hàng #${orderId}`,
      html: `
        <h3>Xin chào ${orderInfo.name},</h3>
        <p>Đơn hàng #${orderId} của bạn đã được ghi nhận.</p>
        <p>Tổng tiền: ${orderInfo.total_price.toLocaleString()} VNĐ</p>
        <p>Cảm ơn bạn đã mua sắm!</p>
      `
    });

    console.log(`Email xác nhận đơn hàng #${orderId} đã được gửi đến ${orderInfo.email}`);
  } catch (err) {
    console.error('Lỗi khi gửi email:', err);
  }
};
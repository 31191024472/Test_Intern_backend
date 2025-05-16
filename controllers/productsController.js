import * as productService from '../service/productService.js';

export const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const products = await productService.getProductsByCategory(categoryId);
    res.json(products);
  } catch (err) {
    console.error('Lỗi controller:', err);
    res.status(500).json({ error: 'Không thể lấy sản phẩm theo danh mục' });
  }
};
export const searchProducts = async (req, res) => {
  try {
    const filters = {
      q: req.query.q || '',
      color: req.query.color,
      size: req.query.size,
      min_price: req.query.min_price,
      max_price: req.query.max_price
    };

    const results = await productService.searchProducts(filters);
    res.json(results);
  } catch (err) {
    console.error('Lỗi tìm kiếm sản phẩm:', err);
    res.status(500).json({ error: 'Không thể tìm kiếm sản phẩm' });
  }
};
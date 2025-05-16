import * as productModel from '../model/productModel.js';

export const getProductsByCategory = async (categoryId) => {
  return await productModel.getProductsByCategory(categoryId);
};
export const searchProducts = async (filters) => {
  return await productModel.searchProducts(filters);
};
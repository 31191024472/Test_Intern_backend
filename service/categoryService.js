import * as categoryModel from '../model/categoryModel.js';

export const getAllCategories = async () => {
  return await categoryModel.getAllCategories();
};

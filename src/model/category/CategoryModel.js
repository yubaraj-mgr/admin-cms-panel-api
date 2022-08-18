import catSchema from "./CategorySchema.js";

// insert category
export const insertCategory = (obj) => {
  return catSchema(obj).save();
};

// get categories
export const getAllCategories = () => {
  return catSchema.find();
};

// get categories by id
export const getCategoryById = (id) => {
  return catSchema.findById(id);
};

import AdminUserSchema from "./AdminUserSchema.js";

// insert user
export const insertAdminUser = (obj) => {
  return AdminUserSchema(obj).save();
};

export const sirKinam2 = (filter) => {
  return AdminUserSchema.find(filter);
};

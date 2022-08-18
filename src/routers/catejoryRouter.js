import express from "express";
import { newCategoryValidation } from "../middlewares/joi-validation/joiValidation.js";
import { insertCategory } from "../model/category/CategoryModel.js";
import slugify from "slugify";
import { getCategoryById } from "../model/category/CategoryModel.js";
import { getAllCategories } from "../model/category/CategoryModel.js";

const router = express.Router();
// ? so that id is optional
router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const categories = _id
      ? await getCategoryById(_id)
      : await getAllCategories();
    res.json({
      status: "success",
      message: "Category List",
      categories,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

router.post("/", newCategoryValidation, async (req, res, next) => {
  try {
    req.body.slug = slugify(req.body.name, {
      lower: true,
      trim: true,
    });
    const result = await insertCategory(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "New category has been added",
        })
      : res.json({
          status: "error",
          message: "Unable to add the category, please try again later",
        });
  } catch (error) {
    next(error);
  }
});

export default router;

// insert new category

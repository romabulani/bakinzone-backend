const Category = require("../models/category.model");

const getAllCategoriesHandler = async (req, res) => {
  try {
    let categories = [];
    categories = await Category.find({});
    return res.status(200).json({ categories });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Could not get categories. Please try again later." });
  }
};

const getCategoryHandler = async (req, res) => {
  try {
    const categoryId = req.params;
    const category = await Category.findById(categoryId);
    return res.status(200).json({ category });
  } catch (e) {
    return res
      .status(400)
      .json({ message: "Could not get category with given ID." });
  }
};

const postCategoryHandler = async (req, res) => {
  try {
    const data = req.body;
    await Category.insertMany(data);
    const categories = await Category.find({});
    return res.status(201).json({ categories });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Could not add categories. Please try again later." });
  }
};

module.exports = {
  getAllCategoriesHandler,
  getCategoryHandler,
  postCategoryHandler,
};

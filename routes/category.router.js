const express = require("express");
const router = express.Router();
const {
  getAllCategoriesHandler,
  postCategoryHandler,
  getCategoryHandler,
} = require("../controllers/category.controller");

router.route("/").get(getAllCategoriesHandler).post(postCategoryHandler);

router.get("/:categoryId", getCategoryHandler);

module.exports = router;

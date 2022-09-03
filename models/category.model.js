const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = Schema({
  _id: String,
  title: String,
  imgUrl: String,
  title: String,
  subTitle: String,
});

module.exports = mongoose.model("Category", categorySchema);

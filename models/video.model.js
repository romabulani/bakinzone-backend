const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = Schema({
  _id: String,
  title: String,
  videoUrl: String,
  category: String,
  uploadDate: Date,
  viewCount: Number,
  description: String,
});

module.exports = mongoose.model("Video", videoSchema);

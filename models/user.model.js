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

const playlistSchema = Schema(
  {
    videos: [videoSchema],
    name: String,
  },
  {
    timestamps: true,
  }
);
const noteSchema = Schema({
  title: String,
  description: String,
  playingTime: Number,
  videoId: String,
});
const userSchema = Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    likes: [videoSchema],
    history: [videoSchema],
    playlists: [playlistSchema],
    watchlater: [videoSchema],
    notes: [noteSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Video = require("../models/video.model");
const playlistSchema = Schema(
  {
    videos: [Video],
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
    likes: [Video],
    history: [Video],
    playlists: [playlistSchema],
    watchlater: [Video],
    notes: [noteSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

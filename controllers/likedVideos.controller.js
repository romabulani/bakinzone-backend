const User = require("../models/user.model");

const getLikedVideosHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { likes } = user;
    return res.status(200).json({ likes });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't get liked videos. Please try again later.",
    });
  }
};

const postVideoToLikedVideosHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { video } = req.body;
    const updatedLikes = [video, ...user.likes];
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          likes: updatedLikes,
        },
      },
      { new: true }
    );
    return res.status(201).json({ likes: updatedUser.likes });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't post video to liked videos. Please try again later.",
    });
  }
};

const deleteVideoFromLikedVideosHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { videoId } = req.params;
    let likes = user.likes;

    if (!likes.find((likedVideo) => likedVideo._id === videoId))
      return res.status(400).json({
        message: "Couldn't find video in liked videos.",
      });

    likes = likes.filter((likedVideo) => likedVideo._id !== videoId);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          likes: likes,
        },
      },
      { new: true }
    );
    return res.status(200).json({ likes: updatedUser.likes });
  } catch (e) {
    return res.status(500).json({
      message:
        "Couldn't delete video from liked videos. Please try again later.",
    });
  }
};

module.exports = {
  getLikedVideosHandler,
  postVideoToLikedVideosHandler,
  deleteVideoFromLikedVideosHandler,
};

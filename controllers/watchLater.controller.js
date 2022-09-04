const User = require("../models/user.model");

const getWatchlaterVideosHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { watchlater } = user;
    return res.status(200).json({ watchlater });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't get watch later videos. Please try again later.",
    });
  }
};

const postVideoToWatchlaterVideosHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const video = req.body;
    const updatedWatchlater = [video, ...user.watchlater];
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          watchlater: updatedWatchlater,
        },
      },
      { new: true }
    );
    return res.status(200).json({ watchlater: updatedUser.watchlater });
  } catch (e) {
    return res.status(500).json({
      message:
        "Couldn't post video to watch later videos. Please try again later.",
    });
  }
};

const deleteVideoFromWatchlaterVideosHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { videoId } = req.params;
    let watchlater = user.watchlater;

    if (!watchlater.find((video) => video._id === videoId))
      return res.status(400).json({
        message: "Couldn't find video in watch later videos.",
      });

    watchlater = watchlater.filter((video) => video._id !== videoId);

    const updatedUser = await User.findByIdAndDelete(
      userId,
      {
        $set: {
          watchlater: watchlater,
        },
      },
      { new: true }
    );
    return res.status(200).json({ watchlater: updatedUser.watchlater });
  } catch (e) {
    return res.status(500).json({
      message:
        "Couldn't delete video from watch later videos. Please try again later.",
    });
  }
};

module.exports = {
  getWatchlaterVideosHandler,
  postVideoToWatchlaterVideosHandler,
  deleteVideoFromWatchlaterVideosHandler,
};

const User = require("../models/user.model");

const getVideosInHistoryHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { history } = user;
    return res.status(200).json({ history });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't get videosin user's history. Please try again later.",
    });
  }
};

const postVideoToHistoryHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { video } = req.body;
    const updatedHistory = [video, ...user.history];
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          history: updatedHistory,
        },
      },
      { new: true }
    );
    return res.status(201).json({ history: updatedUser.history });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't post video to user's history. Please try again later.",
    });
  }
};

const deleteVideoFromHistoryHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { videoId } = req.params;
    let history = user.history;

    if (!history.find((video) => video._id === videoId))
      return res.status(400).json({
        message: "Couldn't find video in history.",
      });

    history = history.filter((video) => video._id !== videoId);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          history: history,
        },
      },
      { new: true }
    );
    return res.status(200).json({ history: updatedUser.history });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't delete video from history. Please try again later.",
    });
  }
};

const clearVideosFromHistoryHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          history: [],
        },
      },
      { new: true }
    );
    return res.status(200).json({ history: updatedUser.history });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't clear videos from history. Please try again later.",
    });
  }
};
module.exports = {
  getVideosInHistoryHandler,
  postVideoToHistoryHandler,
  deleteVideoFromHistoryHandler,
  clearVideosFromHistoryHandler,
};

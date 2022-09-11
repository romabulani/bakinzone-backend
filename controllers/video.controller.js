const Video = require("../models/video.model");
const User = require("../models/user.model");
const getAllVideosHandler = async (req, res) => {
  try {
    let videos = [];
    videos = await Video.find({});
    return res.status(200).json({ videos });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Could not get videos. Please try again later." });
  }
};

const getVideoHandler = async (req, res) => {
  try {
    const videoId = req.params;
    const video = await Video.findById(videoId);
    return res.status(200).json({ video });
  } catch (e) {
    return res
      .status(400)
      .json({ message: "Could not get video with given ID." });
  }
};

const getUploadedVideosHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { uploadedVideos } = user;
    return res.status(200).json({ uploadedVideos });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't get uploaded Videos. Please try again later.",
    });
  }
};

const postUploadVideoHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { uploadVideo } = req.body;
    const updatedUploadedVideos = [uploadVideo, ...user.uploadedVideos];
    await Video.create(uploadVideo);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          uploadedVideos: updatedUploadedVideos,
        },
      },
      { new: true }
    );
    return res.status(201).json({ uploadedVideos: updatedUser.uploadedVideos });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't post note. Please try again later.",
    });
  }
};

const updateVideoViewCountHandler = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findById(videoId);
    const updatedVideo = await Video.findByIdAndUpdate(
      videoId,
      {
        $set: {
          viewCount: video.viewCount + 1,
        },
      },
      { new: true }
    );
    return res.status(200).json({ video: updatedVideo });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't update video views. Please try again later.",
    });
  }
};

module.exports = {
  getAllVideosHandler,
  getVideoHandler,
  getUploadedVideosHandler,
  postUploadVideoHandler,
  updateVideoViewCountHandler,
};

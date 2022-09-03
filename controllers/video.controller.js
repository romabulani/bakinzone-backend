const Video = require("../models/video.model");

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

const postVideoHandler = async (req, res) => {
  try {
    const data = req.body;
    await Video.insertMany(data);
    const videos = await Video.find({});
    return res.status(201).json({ videos });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Could not add videos. Please try again later." });
  }
};

module.exports = {
  getAllVideosHandler,
  getVideoHandler,
  postVideoHandler,
};

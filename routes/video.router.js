const express = require("express");
const router = express.Router();
const {
  getVideoHandler,
  getAllVideosHandler,
  updateVideoViewCountHandler,
} = require("../controllers/video.controller");

router.route("/").get(getAllVideosHandler).post(updateVideoViewCountHandler);

router.get("/:videoId", getVideoHandler);

module.exports = router;

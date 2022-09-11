const express = require("express");
const router = express.Router();
const {
  getVideoHandler,
  getAllVideosHandler,
  updateVideoViewCountHandler,
} = require("../controllers/video.controller");

router.route("/").get(getAllVideosHandler);

router.get("/:videoId", getVideoHandler);
router.get("/:videoId/viewcount", updateVideoViewCountHandler);
module.exports = router;

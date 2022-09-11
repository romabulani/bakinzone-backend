const express = require("express");
const router = express.Router();

const {
  getLikedVideosHandler,
  postVideoToLikedVideosHandler,
  deleteVideoFromLikedVideosHandler,
} = require("../controllers/likedVideos.controller");

const {
  getVideosInHistoryHandler,
  postVideoToHistoryHandler,
  deleteVideoFromHistoryHandler,
  clearVideosFromHistoryHandler,
} = require("../controllers/history.controller");

const {
  getNotesHandler,
  postNoteHandler,
  deletNoteHandler,
  updateNoteHandler,
} = require("../controllers/notes.controller");

const {
  getPlaylistsHandler,
  postPlaylistHandler,
  deletePlaylistHandler,
  getVideosFromPlaylistHandler,
  postVideoToPlaylistHandler,
  deleteVideoFromPlaylistHandler,
} = require("../controllers/playlist.controller");

const {
  getWatchlaterVideosHandler,
  postVideoToWatchlaterVideosHandler,
  deleteVideoFromWatchlaterVideosHandler,
} = require("../controllers/watchLater.controller");

const {
  getUploadedVideosHandler,
  postUploadVideoHandler,
} = require("../controllers/video.controller");

router
  .route("/history")
  .get(getVideosInHistoryHandler)
  .post(postVideoToHistoryHandler);
router.route("/history/:videoId").delete(deleteVideoFromHistoryHandler);
router.route("/history/all").get(clearVideosFromHistoryHandler);

router
  .route("/likes")
  .get(getLikedVideosHandler)
  .post(postVideoToLikedVideosHandler);
router.route("/likes/:videoId").delete(deleteVideoFromLikedVideosHandler);

router
  .route("/watchlater")
  .get(getWatchlaterVideosHandler)
  .post(postVideoToWatchlaterVideosHandler);
router
  .route("/watchlater/:videoId")
  .delete(deleteVideoFromWatchlaterVideosHandler);

router.route("/notes").get(getNotesHandler).post(postNoteHandler);
router.route("/notes/:noteId").post(updateNoteHandler).delete(deletNoteHandler);

router
  .route("/uploadvideo")
  .post(postUploadVideoHandler)
  .get(getUploadedVideosHandler);

router.route("/playlists").get(getPlaylistsHandler).post(postPlaylistHandler);
router
  .route("/playlists/:playlistId")
  .get(getVideosFromPlaylistHandler)
  .post(postVideoToPlaylistHandler)
  .delete(deletePlaylistHandler);
router
  .route("/playlists/:playlistId/:videoId")
  .delete(deleteVideoFromPlaylistHandler);

module.exports = router;

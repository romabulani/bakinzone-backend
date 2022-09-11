const User = require("../models/user.model");
const getPlaylistsHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { playlists } = user;
    return res.status(200).json({ playlists });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't get playlists. Please try again later.",
    });
  }
};
const postPlaylistHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { playlist } = req.body;
    const updatedPlaylists = [playlist, ...user.playlists];
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          playlists: updatedPlaylists,
        },
      },
      { new: true }
    );
    return res.status(201).json({ playlists: updatedUser.playlists });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't post playlist. Please try again later.",
    });
  }
};
const deletePlaylistHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { playlistId } = req.params;
    let playlists = user.playlists;

    if (!playlists.find((playlist) => playlist._id.toString() === playlistId))
      return res.status(400).json({
        message: "Couldn't find playlist.",
      });

    playlists = playlists.filter(
      (playlist) => playlist._id.toString() !== playlistId
    );

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          playlists: playlists,
        },
      },
      { new: true }
    );
    return res.status(200).json({ playlists: updatedUser.playlists });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't delete playlist. Please try again later.",
    });
  }
};
const getVideosFromPlaylistHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const { playlistId } = req.params;
    const user = await User.findById(userId);
    const { playlists } = user;
    const playlist = playlists.find(
      (perPlaylist) => perPlaylist._id.toString() === playlistId
    );
    return res.status(200).json({ playlist });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't get videos in playlist. Please try again later.",
    });
  }
};
const postVideoToPlaylistHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { playlistId } = req.params;
    const { video } = req.body;
    const playlist = user.playlists.find(
      (playlist) => playlist._id.toString() === playlistId
    );
    if (!playlist)
      return res.status(400).json({
        message: "Couldn't find playlist.",
      });
    playlist.videos.push(video);
    const updatedPlaylists = user.playlists.map((perPlaylist) =>
      perPlaylist._id.toString() === playlistId ? playlist : perPlaylist
    );
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          playlists: updatedPlaylists,
        },
      },
      { new: true }
    );
    return res.status(201).json({ playlists: updatedUser.playlists });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't post video to playlist. Please try again later.",
    });
  }
};

const deleteVideoFromPlaylistHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { videoId, playlistId } = req.params;
    const playlist = user.playlists.find(
      (playlist) => playlist._id.toString() === playlistId
    );
    if (!playlist)
      return res.status(400).json({
        message: "Couldn't find playlist.",
      });

    const videoIndex = playlist.videos.find((video) => video._id === videoId);
    const updatedPlaylist = {
      ...playlist,
      videos: playlist.videos.splice(videoIndex, 1),
    };
    const updatedPlaylists = user.playlists.map((perPlaylist) =>
      perPlaylist._id.toString() === playlistId ? updatedPlaylist : perPlaylist
    );
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          playlists: updatedPlaylists,
        },
      },
      { new: true }
    );
    return res.status(200).json({ playlists: updatedUser.playlists });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't delete video from playlist. Please try again later.",
    });
  }
};

module.exports = {
  getPlaylistsHandler,
  postPlaylistHandler,
  deletePlaylistHandler,
  getVideosFromPlaylistHandler,
  postVideoToPlaylistHandler,
  deleteVideoFromPlaylistHandler,
};

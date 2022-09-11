const User = require("../models/user.model");
const ObjectID = require("mongodb").ObjectId;

const getNotesHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { notes } = user;
    return res.status(200).json({ notes });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't get notes. Please try again later.",
    });
  }
};

const postNoteHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { note } = req.body;
    const updatedNotesArray = [note, ...user.notes];
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          notes: updatedNotesArray,
        },
      },
      { new: true }
    );
    return res.status(201).json({ notes: updatedUser.notes });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't post note. Please try again later.",
    });
  }
};

const deletNoteHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { noteId } = req.params;
    let notesArray = user.notes;
    if (!notesArray.find((note) => note._id.toString() === noteId))
      return res.status(400).json({
        message: "Couldn't find note.",
      });

    notesArray = notesArray.filter((note) => note._id.toString() !== noteId);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          notes: notesArray,
        },
      },
      { new: true }
    );
    return res.status(200).json({ notes: updatedUser.notes });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't delete note. Please try again later.",
    });
  }
};

const updateNoteHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { note } = req.body;
    const { noteId } = req.params;

    const updatedNotes = user.notes.map((eachNote) =>
      eachNote._id.toString() === noteId ? note : eachNote
    );
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          notes: updatedNotes,
        },
      },
      { new: true }
    );
    return res.status(200).json({ notes: updatedUser.notes });
  } catch (e) {
    return res.status(500).json({
      message: "Couldn't update notes. Please try again later.",
    });
  }
};
module.exports = {
  getNotesHandler,
  postNoteHandler,
  deletNoteHandler,
  updateNoteHandler,
};

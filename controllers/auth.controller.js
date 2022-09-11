const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const signupHandler = async (req, res) => {
  const data = req.body;
  let userFound;

  try {
    userFound = await User.findOne({ email: data.email });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Signup failed.Please try again later!" });
  }

  if (userFound) res.status(409).json({ message: "User already exists." });

  let encrptedPassword;
  try {
    encrptedPassword = await bcrypt.hash(data.password, 15);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Signup failed.Please try again later!" });
  }

  const createdUser = new User({
    ...data,
    password: encrptedPassword,
    likes: [],
    history: [],
    playlists: [],
    watchlater: [],
    notes: [],
  });

  try {
    await createdUser.save();
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Signup failed.Please try again later!" });
  }

  const token = jwt.sign(
    { userId: createdUser._id, email: createdUser.email },
    process.env.SECRET_KEY,
    { expiresIn: "2h" }
  );
  res.status(201).json({
    message: "Signup successful",
    user: {
      token,
      _id: createdUser._id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email,
      likes: createdUser.likes,
      history: createdUser.history,
      playlists: createdUser.playlists,
      watchlater: createdUser.watchlater,
      notes: createdUser.notes,
    },
  });
};

const loginHandler = async (req, res) => {
  const data = req.body;
  let userFound;
  try {
    userFound = await User.findOne({ email: data.email });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Login failed.Please try again later!" });
  }

  if (!userFound)
    return res.status(401).json({
      message: "Invalid credentials. Check your username and password.",
    });

  let isPasswordValid = false;
  try {
    isPasswordValid = await bcrypt.compare(data.password, userFound.password);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Login failed.Please try again later!" });
  }
  if (!isPasswordValid)
    return res.status(401).json({
      message: "Invalid credentials. Check your username and password.",
    });

  const token = jwt.sign(
    { userId: userFound._id, email: userFound.email },
    process.env.SECRET_KEY,
    { expiresIn: "2h" }
  );
  return res.status(200).json({
    message: "Login successful",
    user: {
      token,
      _id: userFound._id,
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      email: userFound.email,
      likes: userFound.likes,
      history: userFound.history,
      playlists: userFound.playlists,
      watchlater: userFound.watchlater,
      notes: userFound.notes,
    },
  });
};

module.exports = { signupHandler, loginHandler };

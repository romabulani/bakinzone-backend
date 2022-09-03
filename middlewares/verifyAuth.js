const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "Authorization error. Token is not valid.",
    });
  }

  try {
    const verifiedUser = jwt.verify(token, process.env.SECRET_KEY);
    if (verifiedUser) {
      req.userId = verifiedUser.userId;
      next();
      return;
    }
  } catch (e) {
    return res.status(401).json({
      message: "Authorization error. User not found.",
    });
  }
};

module.exports = verifyAuth;

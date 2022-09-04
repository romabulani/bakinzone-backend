const express = require("express");
const router = express.Router();
const {
  loginHandler,
  signupHandler,
} = require("../controllers/auth.controller");

router.post("/login", loginHandler);
router.post("/signup", signupHandler);

module.exports = router;

const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.router");
const categoryRoutes = require("./category.router");
const videoRoutes = require("./video.router");
const userRoutes = require("./user.router");
const verifyAuth = require("../middlewares/verifyAuth");

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/videos", videoRoutes);
router.use("/user", verifyAuth, userRoutes);

module.exports = router;

const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const {
      renderHomePage,
      renderPlayPage,
      renderStatsPage,
      matchStats,
} = require("../controllers/home");

router.route("/").get(renderHomePage);
router.route("/play").get(isLoggedIn, renderPlayPage);
router.route("/stats").get(isLoggedIn, renderStatsPage);
router.route("/matchStats").post(isLoggedIn, matchStats);

module.exports = router;

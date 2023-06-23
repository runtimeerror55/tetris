const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
      renderLoginPage,
      renderRegisterPage,
      loginUser,
      registerUser,
} = require("../controllers/authentication.js");
const { isLoggedIn } = require("../middleware.js");

router.route("/login").get(renderLoginPage);
router.route("/login").post(
      passport.authenticate("local", {
            failureRedirect: "/login",
      }),
      loginUser
);
router.route("/register").post(registerUser);
router.route("/register").get(renderRegisterPage);

module.exports = router;

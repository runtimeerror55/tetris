const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/user.js");
const matchStatsModel = require("./models/matchStats.js");
const UserAllTimeStatsModel = require("./models/userAllTimeStats.js");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const authenticationRouter = require("./routes/authentication.js");
const homeRouter = require("./routes/home.js");

mongoose
      .connect("mongodb://127.0.0.1:27017/tetris")
      .then(() => {
            console.log("connected to mongodb");
      })
      .catch((e) => {
            console.log(e);
      });

app.use(
      session({
            secret: "tetris",
            resave: false,
            saveUninitialized: false,
            cookie: {
                  httpOnly: true,
                  expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
                  maxAge: 1000 * 60 * 60 * 24 * 7,
            },
      })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "src/views");

// app.get("/", (request, response) => {
//       response.render("partials/navBar");
// });
app.use("/", authenticationRouter);
app.use("/", homeRouter);

app.listen(8080, () => {
      console.log("listening on port 8080");
});

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./src/models/user.js");
const matchStatsModel = require("./src/models/matchStats.js");
const UserAllTimeStatsModel = require("./src/models/userAllTimeStats.js");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const authenticationRouter = require("./src/routes/authentication.js");
const homeRouter = require("./src/routes/home.js");

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      require("dotenv").config({ path: __dirname + "\\.env" });
}
const path = require("path");
// mongoose
//       .connect("mongodb://127.0.0.1:27017/tetris")
//       .then(() => {
//             console.log("connected to mongodb");
//       })
//       .catch((e) => {
//             console.log(e);
//       });

mongoose
      .connect(process.env.hosted_db_url)
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

// app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", __dirname + "/src/views");
app.set("view engine", "ejs");

// app.get("/", (request, response) => {
//       response.render("partials/navBar");
// });

app.use("/", authenticationRouter);
app.use("/", homeRouter);

app.listen(8080, () => {
      console.log("listening on port 8080");
});

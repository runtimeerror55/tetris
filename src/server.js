const express = require("express");
const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "src/views");

app.get("/", (request, response) => {
      response.render("home");
});

app.get("/gameArena", (request, response) => {
      response.render("gameArena");
});

app.listen(3000, () => {
      console.log("listening on port 3000");
});

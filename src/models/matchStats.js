const mongoose = require("mongoose");
const matchStatsSchema = mongoose.Schema({
      score: Number,
      singleShots: Number,
      doubleShots: Number,
      tripleShots: Number,
      timeStamp: String,
      author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const matchStatsModel = mongoose.model("matchStats", matchStatsSchema);
module.exports = matchStatsModel;

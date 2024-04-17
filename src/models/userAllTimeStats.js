const mongoose = require("mongoose");
const userAllTimeStatsSchema = mongoose.Schema({
      highestScore: Number,
      highestScoreDate: Date,
      averageScore: Number,
      singleShots: Number,
      doubleShots: Number,
      tripleShots: Number,
      matchesPlayed: Number,
      author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "matchStats" }],
});

const UserAllTimeStatsModel = mongoose.model(
      "userAllTimeStats",
      userAllTimeStatsSchema
);
module.exports = UserAllTimeStatsModel;

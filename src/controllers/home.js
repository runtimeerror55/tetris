const UserAllTimeStatsModel = require("../models/userAllTimeStats");
const matchStatsModel = require("../models/matchStats");

module.exports.renderHomePage = (request, response) => {
      const user = request.user;
      response.render("home", { user });
};

module.exports.renderStatsPage = async (request, response) => {
      const authorId = request.user._id;
      const userAllTimeStats = await UserAllTimeStatsModel.findOne({
            author: authorId,
      });
      const allTimeHighestScores = await UserAllTimeStatsModel.find({})
            .populate("author")
            .sort({ highestScore: -1 })
            .limit(5);

      allTimeHighestScores.forEach((user) => {
            let date = new Date(user.highestScoreDate);
            user.highestScoreDate = `${date.getDate()}/${
                  date.getMonth() + 1
            }/${date.getFullYear()}`;
      });

      response.render("stats", { userAllTimeStats, allTimeHighestScores });
};

module.exports.renderPlayPage = (request, response) => {
      const user = request.user;
      response.render("gameArena", { user });
};

module.exports.matchStats = async (request, response) => {
      const matchStats = request.body;
      const id = request.user._id;
      matchStats.author = id;
      const newMatchStats = new matchStatsModel(matchStats);
      await newMatchStats.save();

      const userAllTimeStats = await UserAllTimeStatsModel.findOne({
            author: id,
      });
      if (!userAllTimeStats) {
            const newUserAllTimeStats = new UserAllTimeStatsModel({
                  highestScore: matchStats.score,
                  averageScore: matchStats.score,
                  singleShots: matchStats.singleShots,
                  doubleShots: matchStats.doubleShots,
                  tripleShots: matchStats.tripleShots,
                  matchesPlayed: 1,
                  author: id,
                  matches: [newMatchStats._id],
            });
            await newUserAllTimeStats.save();
      } else {
            const x = userAllTimeStats;
            const y = matchStats;
            x.highestScore =
                  x.highestScore < y.score ? y.score : x.highestScore;

            if (x.highestScore <= y.score) {
                  let date = new Date();
                  x.highestScoreDate = date.toISOString();
            }
            x.singleShots += y.singleShots;
            x.doubleShots += y.doubleShots;
            x.tripleShots += y.tripleShots;
            x.matchesPlayed++;
            x.averageScore = (x.averageScore + y.score) / x.matchesPlayed;
            x.matches.push(newMatchStats);
            await x.save();
      }

      response.send('{"value": "successfully saved"}');
};

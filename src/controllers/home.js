const UserAllTimeStatsModel = require("../models/userAllTimeStats");
const matchStatsModel = require("../models/matchStats");

module.exports.renderHomePage = (request, response) => {
      response.render("home");
};

module.exports.renderStatsPage = async (request, response) => {
      const authorId = request.user._id;
      const userAllTimeStats = await UserAllTimeStatsModel.findOne({
            author: authorId,
      });
      const allTimeHighestScores = await UserAllTimeStatsModel.find({})
            .sort({ highestScore: -1 })
            .limit(5);
      response.render("stats", { userAllTimeStats, allTimeHighestScores });
};

module.exports.renderPlayPage = (request, response) => {
      response.render("gameArena");
};

module.exports.matchStats = async (request, response) => {
      const matchStats = request.body;
      const id = request.user._id;
      matchStats.author = id;
      const newMatchStats = new matchStatsModel(matchStats);
      console.log(newMatchStats);
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
            console.log(newUserAllTimeStats);
      } else {
            const x = userAllTimeStats;
            const y = matchStats;
            x.highestScore =
                  x.highestScore < y.score ? y.score : x.highestScore;
            x.singleShots += y.singleShots;
            x.doubleShots += y.doubleShots;
            x.tripleShots += y.tripleShots;
            x.matchesPlayed++;
            x.averageScore = (x.averageScore + y.score) / x.matchesPlayed;
            x.matches.push(newMatchStats);
            await x.save();
            console.log(x, "second");
      }

      response.send('{"value": "successfully saved"}');
};

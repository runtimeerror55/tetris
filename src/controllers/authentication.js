const UserModel = require("../models/user");

module.exports.loginUser = (request, response) => {
      response.redirect("/play");
};

module.exports.registerUser = async (request, response) => {
      const { email, username, password } = request.body;
      const newUser = new UserModel({ email, username });
      const registeredUser = await UserModel.register(newUser, password);
      request.login(registeredUser, (error) => {
            if (error) {
                  console.log(error);
            }

            response.redirect("/play");
      });
};

module.exports.renderLoginPage = (request, resoponse) => {
      const user = request.user;
      resoponse.render("login", { user });
};

module.exports.renderRegisterPage = (request, response) => {
      const user = request.user;
      response.render("register", { user });
};

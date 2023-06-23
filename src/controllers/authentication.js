const UserModel = require("../models/user");

module.exports.loginUser = (request, response) => {
      response.redirect("/play");
};

module.exports.registerUser = async (request, response) => {
      const { email, username, password } = request.body;
      const newUser = new UserModel({ email, username });
      const registeredUser = await UserModel.register(newUser, password);
      console.log(registeredUser);
      request.login(registeredUser, (error) => {
            if (error) {
                  console.log(error);
            }
            response.redirect("/play");
      });
};

module.exports.renderLoginPage = (request, resoponse) => {
      resoponse.render("login");
};

module.exports.renderRegisterPage = (request, response) => {
      response.render("register");
};

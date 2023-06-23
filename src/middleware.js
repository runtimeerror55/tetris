module.exports.isLoggedIn = (request, response, next) => {
      if (!request.isAuthenticated()) {
            response.redirect("/login");
      } else {
            next();
      }
};

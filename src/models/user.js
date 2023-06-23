const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = mongoose.Schema({
      email: {
            type: String,
            require: true,
            unique: true,
      },
});

userSchema.plugin(passportLocalMongoose);
const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;

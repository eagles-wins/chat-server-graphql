const { UserInputError, AuthenticationError } = require("apollo-server");
const { validateLoginUser } = require("./validate");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const { SECRET_KEY } = require("../config/details.json");

const loginUsers = async (_, { username, password }) => {
  const { errors, valid } = validateLoginUser(username, password);
  if (!valid) throw new UserInputError("Bad User", { errors });
  try {
    const user = await Users.findOne({ where: { username } });
    if (!user) throw new AuthenticationError("Invalid username/password");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AuthenticationError("Invalid username/password");
    const token = jwt.sign(
      { username: user.username, email: user.email },
      SECRET_KEY,
      { expiresIn: "3h" }
    );
    user.token = token;
    return user;
  } catch (err) {
    console.log(err);
  }
};

module.exports = loginUsers;

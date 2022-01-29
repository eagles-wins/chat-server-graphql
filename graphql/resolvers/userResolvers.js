const { UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const { Users } = require("../../models");
const { SECRET_KEY } = require("../../config/details.json");
const { validateRegisterUser } = require("../../utils/validate");
const loginUsers = require("../../utils/loginUsers");
const { Op } = require("sequelize");

const generateToken = (user) => {
  return jwt.sign({ username: user.username, email: user.email }, SECRET_KEY, {
    expiresIn: "3h",
  });
};
const usersResolvers = {
  Query: {
    getUsers: async (_, __, { user }) => {
      const users = await Users.findAll({
        attributes: ["username", "imageUrl", "createdAt"],
        where: {
          username: {
            [Op.ne]: user.username,
          },
        },
      });
      return users;
    },
    loginUser: loginUsers,
  },

  Mutation: {
    registerUsers: async (
      _,
      { username, email, password, confirmPassword }
    ) => {
      try {
        const { errors, valid } = validateRegisterUser(
          username,
          email,
          password,
          confirmPassword
        );
        if (!valid) throw new UserInputError("Bad Input", { errors });
        // check if the username or the email is taken
        const userByUsername = await Users.findOne({ where: { username } });
        if (userByUsername) {
          errors.username = "Username is taken";
          throw new UserInputError("Bad Input", { errors });
        }
        const userByEmail = await Users.findOne({ where: { email } });
        if (userByEmail) {
          errors.email = "Email is taken";
          throw new UserInputError("Bad Input", { errors });
        }

        const imageUrl = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

        const user = await Users.create({
          username,
          email,
          password: await bcrypt.hash(password, 12),
          imageUrl,
        });

        const token = generateToken(user);
        user.token = token;
        return user;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
};
module.exports = usersResolvers;

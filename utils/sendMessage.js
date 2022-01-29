const { UserInputError } = require("apollo-server");
const { Op } = require("sequelize");
const { Users, Messages } = require("../models");

const sendMessages = async (_, { to, content }, { user }) => {
  console.log(user);
  const errors = {};
  if (to == "") errors.to = "Name is required";
  if (content == "") errors.content = "Empty messages is not allowed";
  if (!Object.keys(errors).length == 0)
    throw new UserInputError("Bad User", { errors });
  try {
    const receipient = await Users.findOne({ where: { username: to } });
    if (!receipient) throw new UserInputError("User not found");

    if (user.username === receipient.username)
      throw new UserInputError("You can't message yourself");

    const message = await Messages.create({ content, from: user.username, to });
    return message;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getMessages = async (_, { from }, { user }) => {
  if (from === "") throw new UserInputError("Name is required");
  try {
    const otherUser = await Users.findOne({ where: { username: from } });
    console.log(otherUser.username);
    console.log(user.username);
    const usernames = [otherUser.username, user.username];
    console.log(usernames);
    const messages = await Messages.findAll({
      where: { from: { [Op.in]: usernames }, to: { [Op.in]: usernames } },
    });
    return messages;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = { sendMessages, getMessages };

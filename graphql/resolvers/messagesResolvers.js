const { sendMessages, getMessages } = require("../../utils/sendMessage");

const messagesResolvers = {
  Query: {
    getMessages,
  },
  Mutation: {
    sendMessage: sendMessages,
  },
};

module.exports = messagesResolvers;

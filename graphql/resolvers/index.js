const messagesResolvers = require("./messagesResolvers");
const usersResolvers = require("./userResolvers");

const resolvers = {
  Query: { ...usersResolvers.Query, ...messagesResolvers.Query },
  Mutation: { ...usersResolvers.Mutation, ...messagesResolvers.Mutation },
};

module.exports = resolvers;

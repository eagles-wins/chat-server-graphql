const colors = require("colors");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen()
  .then(({ url }) => {
    console.log(`server running on ${url}`.blue.bold);
  })
  .catch((err) => console.log(`${err}`.red));

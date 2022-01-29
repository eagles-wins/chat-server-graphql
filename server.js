const colors = require("colors");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { sequelize } = require("./models");
const checkAuth = require("./utils/checkAuth");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (ctx) => checkAuth(ctx),
});

server
  .listen()
  .then(({ url }) => {
    console.log(`server running on ${url}`.blue.bold);
    sequelize.authenticate();
  })
  .then(() => console.log(`Database Connected!!!!!!`.cyan.bold))
  .catch((err) => console.log(`${err}`.red));

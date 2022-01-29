const { gql } = require("apollo-server");

const typeDefs = gql`
  type Users {
    username: String!
    email: String
    token: String!
    createdAt: String!
    imageUrl: String!
    latestMessage: Message!
  }
  type Message {
    content: String!
    from: String!
    to: String!
    createdAt: String!
    uuid: String!
  }
  type Query {
    getUsers: [Users]!
    loginUser(username: String!, password: String!): Users!
  }

  type Mutation {
    registerUsers(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): Users!
  }
`;

module.exports = typeDefs;

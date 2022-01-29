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
    getMessages(from: String!): [Message]!
  }

  type Mutation {
    registerUsers(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): Users!
    sendMessage(to: String!, content: String!): Message!
  }
`;

module.exports = typeDefs;

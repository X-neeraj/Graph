import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    user_following:[ID!]
    user_followers:[ID!]
  }

  type Query {
    getUsers: [User!]!
    getUserById(id: String!): User
    login(email: String!,password: String!): User!
  }

  type Mutation {
    createUser(name: String!, email: String!,password: String!): User!
    followUser(currUser: String!, followUser: String!): String
  }
`;

  
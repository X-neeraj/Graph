import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    getUsers: [User!]!
    getUserById(id: String!): User
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`;

  
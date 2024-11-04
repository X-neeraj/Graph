import { gql } from 'apollo-server-express';

export const postTypeDefs = gql`
  type Post {
    userId:  ID!
    title: String!
    content: String!
  }

  type Query {
    getPosts: [Post!]!
  }

  type Mutation {
    createPost(title: String!, content: String!,userId: ID!): Post!
  }
`;
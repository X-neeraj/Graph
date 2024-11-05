import { gql } from 'apollo-server-express';

export const notificationTypeDefs = gql`
  type Notification {
    id: ID!
    followedId: String!
    message: String!
    createdAt: String!
  }

  type Subscription {
    notification(followedId:String!): Notification!
  }
`;

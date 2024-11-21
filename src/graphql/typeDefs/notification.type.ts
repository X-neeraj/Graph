import { gql } from 'apollo-server-express';

export const notificationTypeDefs = gql`
  type Notification {
    id: ID!
    consumerId: String!
    message: String!
    createdAt: String!
  }

  type Subscription {
    notification(followerId:String!): Notification!
  }
`;

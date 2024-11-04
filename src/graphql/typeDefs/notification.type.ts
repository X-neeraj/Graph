import { gql } from 'apollo-server-express';

export const notificationTypeDefs = gql`
  type Notification {
    id: ID!
    message: String!
    createdAt: String!
  }

  type Subscription {
    notification: Notification!
  }
`;

import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

const NOTIFICATION = "Notification"

export const notificationResolver = {
    Subscription:{
        notification:{
            subscribe: ()=>pubsub.asyncIterator([NOTIFICATION])
        }
    }
}

export const sendNotification = (message: string) => {
    const notification = {
      id: Date.now().toString(),
      message,
      createdAt: new Date().toISOString(),
    };
    pubsub.publish(NOTIFICATION, { notification });
    return notification;
};
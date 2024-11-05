import { PubSub, withFilter } from 'graphql-subscriptions';
import { v4 as uuidv4 } from 'uuid';

const pubsub = new PubSub();

const NOTIFICATION = "Notification"

export const notificationResolver = {
    Subscription:{
        notification:{
            subscribe: withFilter( 
                ()=>pubsub.asyncIterator([NOTIFICATION]),
                (payload:any,variable:any)=>{
                    return payload.notification.followedId===variable.followedId;
                }
            )
        }
    }
}

export const sendNotification = async(userId: string,message: string) => {
    const notification = {
        id: uuidv4(), 
        followedId: userId,
        message,
        createdAt: new Date().toISOString(),
    };
    pubsub.publish(NOTIFICATION, { notification });
    return true;
};
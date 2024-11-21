import { PubSub, withFilter } from 'graphql-subscriptions';
import { v4 as uuidv4 } from 'uuid';
import Redis from 'ioredis';
import jwt from 'jsonwebtoken'; 
import { token } from '../../middleware/authMiddleware';
const redis = new Redis();
const pubsub = new PubSub();

const NOTIFICATION = "Notification"

const activeSubscriptions = new Set<string>();  // Store active user subscriptions

const onUserSubscribe = async (userId: string, pubsub: any) => {
    activeSubscriptions.add(userId.toString());
    const offlineNotifications = await redis.lrange(`offline_messages:${userId}`, 0, -1);
    offlineNotifications.forEach((notification) => {
        pubsub.publish(NOTIFICATION, { notification: JSON.parse(notification) });
    });
    await redis.del(`offline_messages:${userId}`);
};

export const onUserUnsubscribe = (userId: string) => {
    activeSubscriptions.delete(userId);
};


export const notificationResolver = {
    Subscription:{
        notification:{
            subscribe: withFilter(
                (parent: any, args: any, context: any) => {
                    const { followerId } = args; 
                    onUserSubscribe(followerId, pubsub);
                    return pubsub.asyncIterator([NOTIFICATION]);
                },
                (payload:any,variable:any)=>{
                    return payload.notification.consumerId===variable.followerId;
                }
            )
        }
    }
}

export const sendNotification = async(consumerId: string,message: string) => {
    const notification = {
        id: uuidv4(), 
        consumerId: consumerId.toString(),
        message,
        createdAt: new Date().toISOString(),
    };
    if(activeSubscriptions.has(consumerId.toString())){
        pubsub.publish(NOTIFICATION, { notification  });
    }else{
        await redis.rpush(`offline_messages:${consumerId}`, JSON.stringify(notification));
    }

    return true;
};


export const onDisconnectRun=async ()=>{
    try{
        const decoded: any = jwt.verify(token, 'your_jwt_secret_key');
        const userId = decoded._id;
  
        if (userId) {
            activeSubscriptions.delete(userId);
        }
    }catch(error){
        console.error('JWT verification failed:', error);
    }
}

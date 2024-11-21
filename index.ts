import express from "express";
import connectDB from "./src/database/db";
import { ApolloServer } from "apollo-server-express";
import schema from "./src/graphql/schema";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { authMiddleware } from "./src/middleware/authMiddleware";


import { authRequest } from "./src/middleware/authMiddleware";
import { onDisconnectRun } from "./src/graphql/resolvers/notification.resolver";
const app:any=express();
const httpServer = createServer(app);

app.use(authMiddleware);

connectDB()


async function startApolloServer() {
    try {
        const server = new ApolloServer({ schema,
            context: ( {req}:{ req: authRequest } ) => ({
                user: req.user,  
            }),
         });
        await server.start();
        server.applyMiddleware({ app });
        console.log(`Apollo Server started at http://localhost:3000${server.graphqlPath}`);
        console.log(`Subscriptions ready at ws://localhost:3000${server.graphqlPath}`);
    } catch (error) {
        console.error("Error starting Apollo Server:", error);
    }
}

startApolloServer();
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
  
});

useServer(
    {
      schema,
      onDisconnect: onDisconnectRun
    },
    wsServer
);
  
// useServer({ schema }, wsServer);


httpServer.listen(3000,()=>{
    console.log("server started")
})
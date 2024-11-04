import express from "express";
import connectDB from "./src/database/db";
import { ApolloServer } from "apollo-server-express";
import schema from "./src/graphql/schema";
const app:any=express();


connectDB()

async function startApolloServer() {
    try {
        const server = new ApolloServer({ schema });
        await server.start();
        server.applyMiddleware({ app });
        console.log(`Apollo Server started at /graphql`);
    } catch (error) {
        console.error("Error starting Apollo Server:", error);
    }
}

startApolloServer();

app.listen(3000,()=>{
    console.log("server started")
})
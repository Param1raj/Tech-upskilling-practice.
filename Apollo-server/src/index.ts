import "reflect-metadata";
import express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { exampleHello } from "./Modules/example.resolver";
import { AppDataSource } from "./datasource/datasource";
import { UserResolver } from "./Modules/User/User.resolver";
import cors from "cors";
import { ApolloGateway } from "@apollo/gateway";

const main = async () => {
  await AppDataSource.initialize();
  const getWay = new ApolloGateway({
    
  })
  const schema = await buildSchema({
    resolvers: [exampleHello, UserResolver],
    validate: false,
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }: any) => ({ req }),
  });
  const app = express();
  // @ts-ignore
  // const RedisStore = new connectRedis(session);
  app.use(
    cors({
      credentials: true,
      origin: "http:///localhost:3000",
    })
  );
  // app.use(
  //   session({
  //     store: RedisStore,
  //     name: "qid",
  //     secret: "top-secret",
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: {
  //       httpOnly: true,
  //     },
  //   })
  // );
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(
      "Sever is running on the port 4000, http://localhost:4000/graphql"
    );
  });
};

main();

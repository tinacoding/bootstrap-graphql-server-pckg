import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

// Resolvers
import { UserResolver } from "./resolvers/user";

// Utils
import { COOKIE_NAME, __prod__ } from "./utils/constants";

const main = async () => {
  // Sets up db connection
  await createConnection({
    type: "postgres",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "",
    synchronize: true,
    logging: true,
    entities: ["./entities/**/*.ts"]
  });

  // Create express app
  const app = express();

  // Set up cors
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true
    })
  );
  // Create redis store
  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__,
        domain: __prod__ ? "" : undefined
      },
      saveUninitialized: false, // don't allow saving empty data
      secret: "dflkjasdfjkdflkjgdjk",
      resave: false
    })
  );
  // Create an apollo server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false
    }),
    context: ({ req, res }) => ({ req, res, redis })
  });
  // Add apollo middleware
  apolloServer.applyMiddleware({
    app,
    cors: false
  });
  // Listen to app
  app.listen(4000, () => console.log("Server listening on port 4000..."));
};

main();

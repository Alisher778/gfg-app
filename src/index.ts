import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { importSchema } from 'graphql-import';
import http from 'http';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginDrainHttpServer,
  AuthenticationError,
} from 'apollo-server-core';
import { RootResolvers } from './resolvers';
import { getCurrentUser } from './utils/auth';

dotenv.config();

const app = express();
const typeDefs = importSchema(
  './src/schema.graphql',
  {},
  { out: 'DocumentNode' }
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.ENDPOINTPORT || 3000;

async function startApolloServer(typeDefs, resolvers) {
  const corsOptions = {
    optionsSuccessStatus: 200,
    origin: '*',
    credentials: true,
  };
  app.use(cors(corsOptions));

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    introspection: true,
    context: ({ req }) => {
      const token = req.headers?.authorization || '';
      if (!token) {
        throw new AuthenticationError('you must be logged in');
      }

      const user = getCurrentUser(token);
      if (!user) {
        throw new AuthenticationError('Wrong credentials');
      }

      return { user };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen({ port: PORT }, () =>
    console.log(`App is running on port http://localhost:${PORT}/graphql`)
  );
}

module.exports = startApolloServer(typeDefs, RootResolvers);

import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';

import { MODE, PORT } from './config';
import schema from './schema';
import connectDB from './db';
import app from './app';
import services from './services';

const isDevMode = MODE === 'development';

const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(3)],
  context: ({ req }) => {
    return {
      req,
      services,
      dataLoaders: new WeakMap(),
    };
  },
  formatError: err => {
    // Mongo Errors
    if (err.message.startsWith('E11000')) {
      return new Error('Email already taken');
    }
    return err;
  },
  playground: isDevMode,
  debug: isDevMode,
});

server.applyMiddleware({ app });

connectDB().then(() =>
  app.listen(PORT, () => {
    console.log(`Server running in ${MODE} mode on port ${PORT}`);
  }),
);

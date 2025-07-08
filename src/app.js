const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const db = require('./models');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

require('dotenv').config();

const app = express();


async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  server.applyMiddleware({ app });

  db.sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}${server.graphqlPath}`);
    });
  });
}

startServer();

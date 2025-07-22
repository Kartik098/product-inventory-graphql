const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const db = require('./models');
const path = require('path');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const app = express();


// React SPA fallback

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  db.sequelize.sync({ alter: true }).then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

startServer();

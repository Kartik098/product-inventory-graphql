// src/graphql/resolvers/index.js
const productResolver = require("./productResolver");

module.exports = {
  Query: {
    ...productResolver.Query,
  },
  Mutation: {
    ...productResolver.Mutation,
  },
  Product: {
    ...productResolver.Product,
  },
};

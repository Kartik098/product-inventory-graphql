// src/graphql/resolvers/index.js
const productResolver = require("./productResolver");
const categoryResolver = require("./categoryResolver")

module.exports = {
  Query: {
    ...productResolver.Query,...categoryResolver.Query
  },
  Mutation: {
    ...productResolver.Mutation,
  },
  Product: {
    ...productResolver.Product,
  },
};

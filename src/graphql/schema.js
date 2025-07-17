// src/graphql/schema.js
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Category {
    id: ID!
    name: String!
  }

  type PaginatedProducts {
    products: [Product!]!
    totalCount: Int!
    totalPages: Int!
    currentPage: Int!
  }

  type Product {
    id: ID!
    name: String!
    description: String
    quantity: Int
    price: Float
    categories: [Category]
    createdAt: String
  }

  input ProductInput {
    name: String!
    description: String
    price: Float
    quantity: Int
    categoryIds: [ID!]!
  }

  type Query {
  product(id: ID!): Product
  products(
    page: Int!
    limit: Int!
    search: String
    categoryIds: [ID!]
  ): PaginatedProducts!

  categories: [Category!]!
}

  type Mutation {
    addProduct(input: ProductInput!): Product
    deleteProduct(id: ID!): Boolean
    updateProduct(id: ID!, input: ProductInput!): Product
  }
`;


module.exports = typeDefs;

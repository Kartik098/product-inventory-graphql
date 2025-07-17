// src/graphql/queries.js
import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts($page: Int!, $limit: Int!, $search: String, $categoryIds: [ID!]) {
    products(page: $page, limit: $limit, search: $search, categoryIds: $categoryIds) {
      products {
        id
        name
        description
        quantity
        price
        categories {
          id
          name
        }
      }
      totalCount
      totalPages
      currentPage
    }
  }
`;

export const GET_CATEGORIES = gql`
  query {
    categories {
      id
      name
    }
  }
`;

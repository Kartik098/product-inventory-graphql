import { gql, useQuery } from "@apollo/client";

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

export const useCategories = () => {
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  return {
    categories: data?.categories || [],
    loading1:loading,
    error,
  };
};

import { API, graphqlOperation } from "aws-amplify";

export const callGraphQL = async (query, variables) => {
  return API.graphql(graphqlOperation(query, variables));
};

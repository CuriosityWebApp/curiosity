const { GraphQLSchema } = require("graphql");
const { RootQuery, Mutation } = require("./resolvers.js");

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

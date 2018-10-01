const { GraphQLSchema } = require('graphql');
const { Mutation } = require('./mutations.js');
const { RootQuery } = require('./queries.js');

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

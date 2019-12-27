const { GraphQLServer } = require("graphql-yoga");
const db = require("./models");
const Query = require("./resolvers/Query");
//const Mutation = require("./resolvers/Mutations");

const resolvers = {
  Query
  // Mutation
};

const createQLServer = () =>
  new GraphQLServer({
    typeDefs: "./schema.graphql",
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, db })
  });

module.exports = createQLServer;

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello GraphQL",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT ? Number(process.env.PORT) : 4000 },
});

console.log(`🚀 Server ready at ${url}`);

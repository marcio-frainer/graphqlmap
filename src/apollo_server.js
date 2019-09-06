const { ApolloServer } = require('apollo-server-express');

module.exports = (schema, app) => {
    const server = new ApolloServer({
        typeDefs: schema.typeDefs,
        resolvers: schema.resolver,
        playground: {
          endpoint: "/graphql",
          settings: {
            'editor.theme': 'dark'
          }
        }
      });

    server.applyMiddleware({ app });

    return server;
}
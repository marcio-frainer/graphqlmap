/**
 *
 *
 *
*/

const { ApolloServer, gql } = require('apollo-server-express');

exports.GraphParser = function(config, jsonStruct, app) {
    var typeDefsFile = jsonStruct.typeDefs;

    if (typeDefsFile.query) {
      var defs = typeDefsFile.query.def;
      var defsStr = "";
      defs.map( (item) => {
        defsStr += item.name + ': ' + item.type + "\n"
      })

      var queryStr = gql`
        type Query {
          ${defsStr}
        }
      `;

      typeDefs = queryStr;
    }

    var resolvers = {
      Query: {
      }
    }

    defs.map( (item) => {
      Object.defineProperty(resolvers.Query, item.name, {
        value: () => 'teste',
        writable: false
      })
    })

    const server = new ApolloServer({
      typeDefs: typeDefs,
      resolvers: resolvers,
      playground: {
        endpoint: "/graphql",
        settings: {
          'editor.theme': 'dark'
        }
      }
    });

    server.applyMiddleware({ app });
}
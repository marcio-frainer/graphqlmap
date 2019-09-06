const { gql } = require('apollo-server-express');

module.exports = (schema) => {
    let query = schema.query;
    if (query) {
      let defs = query.def;
      let typeDef = "";
      defs.map( (item) => {
        typeDef += item.name + ': ' + item.type + "\n"
      })
      var queryStr = gql`
        type Query {
          ${typeDef}
        }
      `;

      var resolvers = {
        Query: {
        }
      }

      defs.map( (item) => {
        Object.defineProperty(resolvers.Query, item.name, {
          value: 'teste',
          writable: false
        })
      })


      return { typeDefs: queryStr, resolver: resolvers };
    }
}
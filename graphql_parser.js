/** 
 * 
 * 
 * 
*/

var graph = require('graphql-tools');
//var graphqlhttp = require('express-graphql');
var {GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql');
var service = require('@tadashi/placa');

exports.GraphParser = function(jsonStruct, app, graphqlHTTP) {
    var route = jsonStruct.route;
    var table = jsonStruct.table;
    var mapping = jsonStruct.mapping[0];
    var schema = jsonStruct.schemma;

    // app.get(route, (req, resp) => {
    //     return resp.json({
    //         msg: mapping.fieldName
    //     })
    // })

    var schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'RootQueryType',
            fields: {
              hello: {
                type: GraphQLString,
                resolve() {
                  return service('QHN4004');
                }
              }
            }
          })
    })

    app.use(route, graphqlHTTP(async (req, res, graphParams) => ({
        graphiql: true,
        schema: schema
    })));


}
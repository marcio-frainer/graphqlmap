/**
 *
 *
 *
*/

const GraphqlSchema = require('./graphql_schema');
const MappingParser = require('./mapping_parser');
const ApolloServer = require('./apollo_server');
const sequelize = require('sequelize');
const typeDefs = require('apollo-server-schema');

exports.GraphParser = function(config, jsonStruct, app) {
    let schema = GraphqlSchema(jsonStruct.schema);
    MappingParser(sequelize, )
    ApolloServer(schema, app);
}
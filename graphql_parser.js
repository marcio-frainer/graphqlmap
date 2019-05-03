/** 
 * 
 * 
 * 
*/

var graph = require('graphql-tools');

exports.GraphParser = function(jsonStruct, app) {
    var route = jsonStruct.route;
    var table = jsonStruct.table;
    var mapping = jsonStruct.mapping[0];
    var schemma = jsonStruct.schemma;

    console.log(route);
    app.get(route, (req, resp) => {
        return resp.json({
            msg: mapping.fieldName
        })
    })


}
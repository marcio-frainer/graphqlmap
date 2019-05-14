/** 
 * 
 * 
 * 
*/

var express = require('express');
var graphqlHTTP = require('express-graphql');
var bodyParser = require('body-parser');
const app = express();
const PORT = 5500;


exports.LoadServer = function(){
    app.use(bodyParser.json());

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Credentials', true);
        next();
    });
    
    app.listen(PORT, () => {
      console.log(`Server is running at PORT ${PORT}`)
    })
   
    return app;
}

exports.LoadGraphqlHTTP = function(){
  return graphqlHTTP;
}


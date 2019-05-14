/** 
 * 
 * 
 * 
*/

const fs = require('fs');
const path = require('path');
var graphql_parser = require('./graphql_parser');
//const map_parser = require('./mapping_parser');
const load_server = require('./load_server');
const app = load_server.LoadServer();
const graphqlHTTP = load_server.LoadGraphqlHTTP();
const config = require('./config');

var extension = ".json";

function LoadStructureFile(jsonFile) {
  // if (!ValidateStructureFile(jsonFile)) {
  //   SetConsoleLog("The structure of file " + jsonFile + " is invalid!");
  //   return;
  // }
  LoadFile(jsonFile);
}

function LoadFile(file) {
  try {
    console.log("Loading: " + path.basename(file) + ".");
    var contents = fs.readFileSync(file);
    var jsonContent = JSON.parse(contents);
    graphql_parser.GraphParser(jsonContent, app, graphqlHTTP);
  } catch (e) {
    console.log(e);
  }
}

function ValidateStructureFile(jsonFile) {

}

LoadDirectory = function(dir) {
  var files = fs.readdirSync(dir);
  files.forEach(function (x) {
    var fileName = ".\\" + dir + "\\" + x;
    if (fs.lstatSync(fileName).isDirectory()) {
      LoadDirectory(fileName);
      return;
    };
    if (fs.lstatSync(fileName).isFile()) {
      var fileExt = path.extname(fileName);
      if (fileExt != extension) 
        return;
      LoadStructureFile(fileName);
    };
  });
}

exports.Load = function(dir) {
  LoadDirectory(dir);
}
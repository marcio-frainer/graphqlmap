

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * GraphQL server application
 * Node.js
 * Marcio Frainer - 14/05/2019
 *
 * Load structure file
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/

const fs = require('fs');
const path = require('path');
var graphql_parser = require('./graphql_parser');
//const map_parser = require('./mapping_parser');
const load_server = require('./load_server');
const app = load_server.LoadServer();
const mssql = require('./mssql_connect');

var extension = ".json";

LoadFileToJson = function (file) {
  try {
    console.log("Loading: " + path.basename(file) + ".");
    var contents = fs.readFileSync(file);
    return JSON.parse(contents);
  } catch (e) {
    console.log(e);
  }
}

function LoadStructureFile(jsonFile) {
  // if (!ValidateStructureFile(jsonFile)) {
  //   SetConsoleLog("The structure of file " + jsonFile + " is invalid!");
  //   return;
  // }
  var jsonFormat = LoadFileToJson(jsonFile);
  var database = LoadFileToJson('./config.json').database;
  mssql.Config(database.config, null);
  graphql_parser.GraphParser(null, jsonFormat, app);
}

function ValidateStructureFile(jsonFile) {

}

LoadDirectory = function(dir) {
  var files = fs.readdirSync(dir);
  console.log(`loading dir -> ${dir}`);
  files.forEach(function (file) {
    var fileName = /*".\\" + */ dir + "\\" + file;
    if (fs.lstatSync(fileName).isDirectory()) {
      LoadDirectory(fileName);
      return;
    };
    if (fs.lstatSync(fileName).isFile()) {
      console.log(`loading file -> ${file}`);
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
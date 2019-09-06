

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
const load_server = require('./load_server');
const app = load_server.LoadServer();
const graphql_parser = require('./graphql_parser');
const mssql = require('./mssql_connect');

var extension = ".json";

LoadFileToJson = function (file) {
  try {
    console.log(`Loading: ${path.basename(file)}`);
    var contents = fs.readFileSync(file);
    return JSON.parse(contents);
  } catch (e) {
    console.log(e);
  }
}

function LoadStructureFile(jsonFile) {
  let jsonFormat = LoadFileToJson(jsonFile);
  console.log(path.dirname(jsonFile));
  let database = LoadFileToJson('src/config.json').database;
  mssql.Config(database.config, null);
  graphql_parser.GraphParser(null, jsonFormat, app);
}

function ValidateStructureFile(jsonFile) {

}

LoadDirectory = function(dir) {
  let dirFiles = fs.readdirSync(dir);
  console.log(`loading dir -> ${dir}`);
  dirFiles.forEach(function (file) {
    let fileName = `${dir}\\${file}`;
    if (fs.lstatSync(fileName).isDirectory()) {
      LoadDirectory(fileName);
      return;
    };
    if (fs.lstatSync(fileName).isFile()) {
      console.log(`loading file -> ${file}`);
      let fileExt = path.extname(fileName);
      if (fileExt != extension)
        return;
      LoadStructureFile(fileName);
    };
  });
}

exports.Load = function(dir) {
  LoadDirectory(dir);
}
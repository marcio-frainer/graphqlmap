const fs = require('fs');
const path = require('path');
var graphql_parser = require('./graphql_parser');
const map_parser = require('./mapping_parser');

var express = require('express');
var bodyParser = require('body-parser');
const app = express();
const PORT = 5500;

var graph = require('graphql-tools');


//  "start": "nodemon index.js --exec babel-node --presets env,stage-2",
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

var folder = process
  .argv
  .slice(1);

if (folder.length === 0) {
  console.log('Invalid path.');
  exit;
}

var pathFile = folder[1];
var extension = ".json";

function SetConsoleLog(text) {
  console.log("");
  console.log(text);
}

function LoadDirectory(dir) {
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

function LoadStructureFile(jsonFile) {
  // if (!ValidateStructureFile(jsonFile)) {
  //   SetConsoleLog("The structure of file " + jsonFile + " is invalid!");
  //   return;
  // }
  LoadFile(jsonFile);
}

function LoadFile(file) {
  try {
    SetConsoleLog("Loading: " + file + ".");
    var contents = fs.readFileSync(file);
    var jsonContent = JSON.parse(contents);
    console.log(jsonContent);
    graphql_parser.GraphParser(jsonContent, app);
  } catch (e) {
    console.log(e);
  }
}

function ValidateStructureFile(jsonFile) {

}

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`)
})

LoadDirectory(pathFile);

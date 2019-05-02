const fs = require('fs');
const path = require('path');

var folder = process
  .argv
  .slice(1);

if (folder.length === 0) {
  console.log('Invalid path.');
  return;
};

var pathFile = folder[1];
var extension = ".json";

function SetConsoleLog(text) {
  console.log("");
  console.log(text);
}

LoadDirectory(pathFile);

function LoadFile(file) {
  try {
    setConsoleLog("Loading: " + file + ".");
    var readedFile = fs.readFileSync(file);
    var jsonFile = JSON.parse(readedFile);
  } catch (e) {
    console.log(e);
  }
};

function LoadDirectory(dir) {
  var files = fs.readdirSync(dir);
  files.forEach(function (x) {
    var fileName = dir + x;
    if (fs.lstatSync(fileName).isDirectory()) {
      LoadDirectory(fileName);
      return;
    };
    if (fs.lstatSync(filename).isFile()) {
      var fileExt = path.extname(filename);
      if (fileExt != extension) 
        return;
      LoadStructureFile(filename);
    };
  });
};

function LoadStructureFile(jsonFile) {
  if (!ValidateStructureFile(jsonFile)) {
    SetConsoleLog(`The structure of file {jsonFile} is invalid!`);
    return;
  }
}

function ValidateStructureFile(jsonFile) {

}
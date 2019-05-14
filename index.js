/** 
 * 
 * 
 * 
*/

const load_files = require('./load_files');

var folder = process
  .argv
  .slice(1);

if (folder.length === 0) {
  console.log('Invalid path.');
  exit;
}

var pathFile = folder[1];

load_files.Load(pathFile);

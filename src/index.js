

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * GraphQL server application
 * Node.js
 * Marcio Frainer - 14/05/2019
 *
 * Load config file with database connection
 * Load folder with structure json files
 * Analisys all files and errors return
 * Parser information and load sctructures
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/

const load_files = require('./load_files');

var params = process
  .argv
  .slice(1);

if (params.length === 0) {
  console.log('Invalid path.');
  exit;
}

if (params[1] === '--help') {
  console.log('');
  return;
}

var pathFile = params[1];

load_files.Load(pathFile);

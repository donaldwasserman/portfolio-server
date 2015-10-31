var path = require('path'),
    fs = require('fs'),
    marked = require('marked'),
    Promise = require('bluebird'),
    yfm = require('yaml-front-matter');

module.exports = function(file, dir) {

  var contents = fs.readFileSync(dir+'/'+file, 'utf8');

  var results = yfm.loadFront(contents);
  var output = {};

  for (var data in results) {
    if (results.hasOwnProperty(data)) {
      //console.log(data);
      if (data === '__content') {
        output.content = marked(results.__content);
      } else {
        output[data] = results[data];
      }
    }
  }
  //console.log(output);
  return output;

};

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    path = require('path'),
    fs = require('fs'),
    marked = require('marked'),
    Promise = require('bluebird'),
    readFile = require('./app/readFile');

var port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));

app.listen(port);

Promise.promisifyAll(fs);

app.get('/posts', function(req, res) {
  fs.readdirAsync('posts')
    .then(function(files) {
      var posts = [];

      files.forEach(function(e) {
        console.log(readFile(e, 'posts'));
        posts.push(readFile(e, 'posts'));
      });

      res.json({data: posts});
    }).catch(function(err) {
      res.json({error: err});
    });
});

app.get('/post/:title', function (req, res) {
  var title = req.params.title + '.md';
  res.json({data: [readFile(title, 'posts')]});
});

app.get('*', function (req, res) {
  res.json({message: 'welcome to the api'});
});

console.log('server is running on port ' + port);
exports = module.exports = app;

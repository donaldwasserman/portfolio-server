var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    path = require('path'),
    fs = require('fs'),
    marked = require('marked'),
    Promise = require('bluebird'),
    readFile = require('./app/readFile'),
    morgan = require('morgan'),
    mdJson = require('md-json');

var port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));

app.listen(port);

Promise.promisifyAll(fs);

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');

     if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    next();
});

app.use(morgan('combined'));

app.get('/posts', function(req, res) {
  var posts = mdJson('posts');
  posts.then(function(data) {
    res.json(data);
  });
});

app.get('/posts/:title', function (req, res) {
  var post = mdJson('posts', req.params.title);
  post.then(function(data) {
    res.json(data);
  });
});

app.get('/projects', function(req, res) {
  var d = mdJson('projects');
  d.then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    res.json(err);
  });
});

app.get('/projects/:title', function(req, res) {
  var d = mdJson('projects', req.params.title);
  d.then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    res.json(err);
  });
});

app.get('*', function (req, res) {
  res.json({message: 'welcome to the api'});
});

console.log('server is running on port ' + port);
exports = module.exports = app;

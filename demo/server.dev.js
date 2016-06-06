var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var proxy = require('proxy-middleware');
var url = require('url');
var DRUMKIT_FILE = path.join(__dirname, 'drumkit.json');
var webpack = require('webpack');
var config = require('./webpack.config.js');
var host = config.host || 'localhost';
var port = Number(process.env.PORT) || 8080;
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, { // Start a server
  publicPath: config.output.publicPath,
  hot: true, // With hot reloading
  inline: false,
  historyApiFallback: false,
  quiet: false,
  stats: {colors: true},
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  headers: {'Access-Control-Allow-Origin': '*'}
  /*
  proxy: {
    '/api*' : 'http://localhost:' + (port+1)
  }
  */
}));
app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/api/getdrumkit', function(req, res) {
  fs.readFile(DRUMKIT_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/setdrumkit', function(req, res) {
  fs.readFile(DRUMKIT_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newComment = {
      id: Date.now(),
      author: req.body.author,
      text: req.body.text,
    };
    comments.push(newComment);
    fs.writeFile(DRUMKIT_FILE, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.setHeader('Cache-Control', 'no-cache');
      res.json(comments);
    });
  });
});

app.listen(port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port);
  }
});

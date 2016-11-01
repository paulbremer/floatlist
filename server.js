var express = require('express');
var path = require('path');
var opn = require('opn');
var serveStatic = require('serve-static');

app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));

var port = process.env.PORT || 5000;

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
  opn(uri)
})

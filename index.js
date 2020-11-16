var http = require('http')
var express = require('express')
var path = require('path')

var favicon = require('serve-favicon')
var bodyParser = require('body-parser')
var repoRoute = require('./routes/index')

var app = express()

// all environments
app.set('port', process.env.PORT || 3000)

app.use('/githubgraphql', repoRoute);

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})
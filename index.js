var http = require('http')
var express = require('express')
var path = require('path')
var routers = require('./routes/index')

var favicon = require('serve-favicon')
var bodyParser = require('body-parser')

var app = express()

// all environments
app.set('port', process.env.PORT || 3000)
// app.use(favicon(path.join(__dirname, '/public/favicon.ico')))

app.use('/ggql', routers)
app.use('/client', express.static('public'));

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
})
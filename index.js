var http = require('http')
var express = require('express')
var path = require('path')

var favicon = require('serve-favicon')
var bodyParser = require('body-parser')

var app = express()

// all environments
app.set('port', process.env.PORT || 3000)
// app.use(favicon(path.join(__dirname, '/public/favicon.ico')))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.static(path.join(__dirname, 'public')))

// app.get('/', routes.index)
// app.get('/users', user.list)

const { graphql } = require("@octokit/graphql");

const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: `token 624ce67f41026d19f2134ba859253ec120932788`,
    },
  });
  const { repository } = graphqlWithAuth(`
    {
        viewer {
            login
            starredRepositories {
              totalCount
            }
            avatarUrl
            repositories(last: 20) {
              edges {
                node {
                  name
                  stargazers {
                    totalCount
                  }
                  watchers {
                    totalCount
                  }
                  description
                  createdAt
                  languages(first: 10) {
                    nodes {
                      name
                    }
                  }
                }
              }
            }
          }
    }
  `).then(res => {
      console.log('res ===> ', res);
      return res;
  }).catch(err => err);

var server = http.createServer(app)
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})
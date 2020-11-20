var express = require('express')
var router = express.Router()

const { graphql } = require("@octokit/graphql");

// define the repository route
router.get('/repositories', function (req, res) {
    const graphqlWithAuth = graphql.defaults({
        headers: {
          authorization: `token 624ce67f41026d19f2134ba859253ec120932788`,
        },
      });
      graphqlWithAuth(`
      {
        viewer {
          login
          starredRepositories {
            totalCount
          }
          avatarUrl
          bio
          name
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
                languages(first: 1) {
                  nodes {
                    name
                  }
                }
              }
            }
          }
        }
      }      
      `).then(result => {
          return res.json(result);
        }).catch(err => err);
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About github graphql')
})

module.exports = router
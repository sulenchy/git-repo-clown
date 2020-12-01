var express = require('express')
var router = express.Router()
require('dotenv').config()
const { graphql } = require("@octokit/graphql");

// define the repository route
router.get('/repositories', function (req, res) {
    const graphqlWithAuth = graphql.defaults({
        headers: {
          authorization: `token ${ process.env.TOKEN }`,
        },
      });
      console.log(process.env.TOKEN)
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
                pushedAt
                languages(first: 1) {
                  nodes {
                    name
                    color
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
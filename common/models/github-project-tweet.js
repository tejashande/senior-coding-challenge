'use strict';

module.exports = function(GithubProjectTweet) {
  const rp = require('request-promise');
  const config = require('../../server/config');

  // Remote method to find tweets for the github projects based on search filter
  GithubProjectTweet.getTweets = async (githubProjectName) => {
    try {
      let githubProjectsResponse = await getGithubProjects(githubProjectName);
      let githubProjects = JSON.parse(githubProjectsResponse);
      let githubProjectTweets = await getProjectsTweets(githubProjects.items);
      githubProjectTweets = githubProjectTweets.map(
      	githubProjectTweet => JSON.parse(githubProjectTweet)
      );
      return githubProjectTweets;
    } catch (error) {
    	console.error(error);
      const errorObject = new Error('500 Internal Server Error');
      errorObject.statusCode = 500;
      errorObject.name = 'Error';
      errorObject.code = 'INTERNAL_SERVER_ERROR';
      return errorObject;
    }
  };

  // To retrieve github projects for the search
  async function getGithubProjects(githubProjectName) {
	  return rp({
	    method: 'GET',
	    uri: (`https://api.github.com/search/repositories?q=${githubProjectName}`),
	    headers: {'user-agent': 'node.js'},
	  });
  };

  // Get tweets for all the returned github projects
  const getProjectsTweets = async (projects) => {
    return await Promise.all(
      projects.map(
        project => getProjectTweetsByName(project.name),
      ),
    );
  };

  // Retrieve 3 tweets for a project based on name
  const getProjectTweetsByName = async (name) => {
  	return rp({
    'method': 'GET',
    'url': `https://api.twitter.com/1.1/search/tweets.json?q=${name}&count=3`,
    'headers': {
      'User-Agent': 'client',
    },
    'oauth': config.oauth,
  });
  };

  // Remote method along with its confiuration and parameters
  GithubProjectTweet.remoteMethod('getTweets', {
    accepts: [
      {
        arg: 'githubProjectName',
        type: 'string',
        description: 'The github project name.',
        required: true,
      },
    ],
    returns: {type: 'object', root: true},
    http: {verb: 'get'},
  });
};

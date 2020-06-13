'use strict';
const assert = require('assert');
const request = require('supertest');
const app = 'http://localhost:3000/api/GithubProjectTweets/';

describe('GET /getDistance', function() {
  it('should respond with json containing a response',
    function(done) {
      request(app)
        .get('/getTweets?githubProjectName=reactive')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

  it('should respond with error - githubProjectName is a required argument',
    function(done) {
      request(app)
        .get('/getTweets?test=fail')
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          assert.equal(res.body.error.message, 'githubProjectName is a required argument');
          done();
        });
    });
});

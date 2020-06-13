# Github Project Tweets API

I have used Node.js for this assignment. Tweets related to Github project name is exposed in the form of API. API can be consumed from web applications and mobile applications.

The logic for github project tweets is written in ./common/models/github-project-tweet.js file.

Test cases for API are written in ./test/github-project-tweet-test-cases.js file. The mocha test report can be seen in mocha-report.jpeg file. For best practices, I have used eslint and its report can be seen in eslint-report.html file. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To get started, you should have **node** and **npm** installed. It can be downloaded from https://nodejs.org/en/ and npm comes with node. Please use below commands to check your node and npm version.

```
node -v
npm -v
```

### Installing

Below are the series of steps that will tell you how to get an app running

Enter into the root directory and install node modules by running below commands:
```
npm install
```

To start node services, run below command:
```
npm start
```

To run test cases for API, please open a new terminal and run below command:
```
npm run test
```
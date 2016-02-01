# Ninja API starter

[![Continuos integration status](https://api.travis-ci.org/jesusprubio/ninja-api-starter.svg)](https://api.travis-ci.org/jesusprubio/ninja-api-starter.svg)
[![Dependencies](https://david-dm.org/jesusprubio/ninja-api-starter.svg)](https://david-dm.org/jesusprubio/ninja-api-starter)
[![devDependencies](https://david-dm.org/jesusprubio/ninja-api-starter/dev-status.svg)](https://david-dm.org/jesusprubio/ninja-api-starter#info=devDependencies)

My boilerplate implementing a modern REST API. A cheap (in terms of money and productivity), but scalable and secure, microservices architecture based in [LoopBack](http://loopback.io/).

NOTE: A work in progress.

To achieve it I tried to [KISS](https://en.wikipedia.org/wiki/KISS_principle) as far as possible:
- LoopBack: It gives me (for free!) most of the common stuff I must implement by myself when I had to start an API: Login system (with OAuth), CRUD, etc. Ref.: http://blog.jeffdouglas.com/2015/07/07/roll-your-own-api-vs-loopback/.
- [Bluebird](http://bluebirdjs.com/): Normally I prefer to use [Node ES6/7 native stuff](https://nodejs.org/en/docs/es6/), but Bluebird performance is better for now. Moreover it gives me some useful functions like "Promise.promisify" or "Promise.series". Refs.:
 - http://bluebirdjs.com/docs/why-bluebird.html.
 - http://programmers.stackexchange.com/a/279003.
 - http://ciplogic.com/index.php/blog/92-native-vs-bluebird-vs-core-promise-benchmark.
- [Tape](https://github.com/substack/tape): "Mocha is a $150k Porsche Panamera when the best tool for the job is a $30k Tesla Model 3. Don’t waste your resources on testing bells and whistles. Invest them in creating your app, instead.", ref.: https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4.
- [debug](https://github.com/visionmedia/debug): The same one that LoopBack uses, to keep logs format consistent with it.
- [Lodash](https://lodash.com): A must.
- I don't use any task runner, [npm scripts](https://docs.npmjs.com/misc/scripts) are enough an simpler. Ref.: https://medium.com/@housecor/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8#.7ro8qm88f


And what about the services?
- [Bluemix](http://bluemix.net/)/[Heroku](http://heroku.com/): These on-demand deployment platforms allow us to focus in what matter, the code of our app. I couldn't live without Heroku but It's always good to have alternatives (and redundancy!). Ref: https://blog.codeship.com/exploring-microservices-architecture-on-heroku/
- [MongoDB](https://www.mongodb.org/): The most NoSQL used option and my favorite one. All provided options in both cases are similar. Before launching to production it's mandatory to chose one which supports on-demand provisioning.
- [Layer](https://layer.com/): With the power of [Erlang](https://www.erlang.org/) under the hood. One of the best options to add a consistent chat. As an ex VoIP developer and security researcher please, don't do it yourself ;).
- [SendGrid](https://sendgrid.com/): Transactional email delivering, the most used option.
- [Librato](https://www.sumologic.com): Only to monitor native Heroku metrics, because they don't provide it with the free machines. BTW, the Heroku panel ones are nice.
- [SumoLogic](https://www.sumologic.com): Log, KPIs, troubleshoot and [SIEM]([SIEM](https://en.wikipedia.org/wiki/Security_information_and_event_management)) in the same place. Too often we found that we finish sending stuff to too much tracking systems. This infrastructure is crazy to manage and a performance killer.

Demos:
- Bluemix: https://ninja-api-starter.eu-gb.mybluemix.net/explorer
- Heroku: http://ninja-api-starter.herokuapp.com/explorer


## Install

- Install the last Node.js stable version.
 - https://nodejs.org/download
 - A better alternative for developers is to use [nvm](https://github.com/creationix/nvm), to test different versions.

- Get a copy of the code and install Node dependencies.
```sh
git clone https://github.com/jesusprubio/ninja-api-starter
cd ninja-api-starter
npm i
```


## Use

- Start:
```sh
npm start
```

- In local environment with auto-reloading on changes.
```sh
npm run-script watch
```

- You can visit the documentation at: http://0.0.0.0:3000/explorer/


## Developer guide

- Use [GitHub pull requests](https://help.github.com/articles/using-pull-requests).
- Conventions:
 - We use [ESLint](http://eslint.org/) and [Airbnb](https://github.com/airbnb/javascript) style guide.
 - Please run to be sure your code fits with it and the tests keep passing:
 ```sh
 npm run-script cont-int
 ```

### Tests

- They can be run at one, by category or individually:
```sh
npm test
npm run-script test-unit
npm run-script test-functional
node test/unit/pathToName.js
```


## Deploy

- Restart Git history.
```sh
rm -rf .git
git init
git commit -am "First commit."
```

### Bluemix

- Install the [Cloufoundry](https://www.cloudfoundry.org/) CLI: https://github.com/cloudfoundry/cli/releases

- Use it to login: https://www.ng.bluemix.net/docs/starters/install_cli.html

- Create the app and push it for the first time:
```sh
cf push ninja-api-starter
```

- Set Node.js to work in production environment, why?: http://apmblog.dynatrace.com/2015/07/22/the-drastic-effects-of-omitting-node_env-in-your-express-js-applications/
```sh
cf set-env ninja-api-starter NODE_ENV production
```

- Add and bind services.
```sh
cf create-service mongodb 100 mongodb01
cf bind-service ninja-api-starter mongodb01
cf create-service sendgrid free sendgrid
cf bind-service ninja-api-starter sendgrid
```

- Push again once all services are enabled:
```sh
cf push ninja-api-starter
```

- Check the logs.
```sh
cf logs ninja-api-starter
```

- Setup SumoLogic: http://docs.cloudfoundry.org/devguide/services/log-management-thirdparty-svc.html?cm_mc_uid=09105103504314536537745&cm_mc_sid_50200000=1454069917#sumologic


### Heroku

- Install the CLI and login: https://devcenter.heroku.com/articles/heroku-command#installing-the-heroku-cli

- Create a new instance.
```sh
heroku create ninja-api-starter
```
- See Bluemix steps to know the reason.
```sh
heroku config:set NODE_ENV=production
```
- To avoid hardcode stuff in the code of the app.
```sh
heroku config:set APP_URL=$(heroku info -s | grep web-url | cut -d= -f2)
```
- Install services.
```sh
heroku addons:create mongolab:sandbox
heroku addons:create sendgrid:starter
heroku addons:create librato:development
heroku addons:create sumologic
```
- First push.
```sh
git push heroku master
```
- Check the logs.
```sh
heroku logs
```


## Security

### SSL support

#### Bluemix
TODO

#### Heroku
- Addon: https://elements.heroku.com/addons/expeditedssl.
- Howto: https://www.youtube.com/watch?v=OcyR7Yus4pc.


## TODO
- Add a couple of remote methods.
- Add some more tests.
- Review the logging/debugging stuff.
- OAuth support (Twitter).
- Send mail on signup.
- A worker to get everyday DB stats.
- Security:
 - Helmet support.
 - Node.j security checklist. (NodeGoat)
 - Brute-force protection (rate-limit).
- Chat support with Layer.
 - Add integration tests.
- Redis cache example.
- WiredTiger support to improve the performance.


## License

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

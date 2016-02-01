/*
  Copyright Jesus Perez <jesusprubio gmail com>

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
*/

'use strict';


const loopback = require('loopback');
const boot = require('loopback-boot');

const logger = require('./lib/logger')(__filename);


const app = loopback();


app.start = () =>
  // Starting the web server.
  app.listen(() => {
    const baseUrl = app.get('url').replace(/\/$/, '');

    app.emit('started');
    logger.log(`Web server listening at: ${ baseUrl }`);

    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;

      logger.log(`Browse your REST API at ${ baseUrl }${ explorerPath }`);
    }
  });


// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, (err) => {
  if (err) {
    logger.error('Booting the app', err);

    process.exit(1);
  }

  // Start the server if `$ node server.js`.
  if (require.main === module) { app.start(); }
});


module.exports = app;
